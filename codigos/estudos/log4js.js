/*LOG4JS
 * O LOG4JS é um framework para log escrito em javascript.
 * Ele suporta output melhor formatado no console, substituição do system.log,
 * append automático em arquivos, com log unrollign baseado no tamanho do 
 * arquivo ou data, suporte a vários sistemas online de gerenciamento de logs
 * (SMTP, GELF, LOGGY, LOGSTASH, LogFaces), appender multiprocessado, suporte
 * a express e connect, layouts configuraveis de mensagem de log e diferentes
 * níveis de log.
 */
 //Exemplo
 var log4js = require('log4js');
 var logger = log4js.getLogger();
 logger.debug("Mensagem de debug");
/*
Este código geraria uma mensagem de log no estilo

[2010-01-17 11:43:37.987] [DEBUG] [default] - Mensagem de debug

*/ 

//logar as mensagens do tipo 'configuracao' e do console em um arquivo
log4js.configure({
    appenders:[
        {
            type:"file",
            filename:"logAdm.log",
            category: ['config','console']
        },
        {
            type: "console"
        }
    ],
    replaceConsole: true
});

//Adicionar um appender, sem limpar outros 
//loadAppender só  preisa ser chamado se ainda naõ foi configurado um desse
//tipo 
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('acoes.log'),'acoes');
//Um logger personalizado que nao esteja em log4js/lib/appenders pode ser aces-
/*sado da seguinte maneira:
log4js.loadAppender('o/que/voce/quer/por/no/require');
log4js.addAppender(log4js.appenders['o/que/voce/quer/por/no/require'](args));
//ou através do configure
log4js.configure({
    appenders: [ { type: 'o/que/voce/quer/por/no/require', args: 'etc' }]
});
*/

var logger = log4js.getLogger('config');
//Logar somente erros ou pior
//Também da pra setar o level de log no objeto de configuracao atraves do 
//campo 'levels'
logger.setLevel("ERROR");
//Os metodos de log em console foram susbtituidos pelos do log4js. Logo, o 
//console.log vai soltar um log bonitinho e aparecer no logAdm.log

console.error("Algo deu errado!",{some:'outroObjeto', useful_for:'Debug'});
console.log("Isto é um output informativo");
//Os seguintes nao aparecerao
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.log('Something funny about cheese.');
logger.warn('Cheese is quite smelly.');
//Estes vão aparecer no console e no arquivo
logger.error('Cheese %s is too ripe!', "gouda");
logger.fatal('Cheese was breeding ground for listeria.');

//Estes não aparecerão no arquivo, mas sim no terminal
const outroLogger = log4js.getLogger('outro');
outroLogger.debug("Testando!");

//um para acoes.log
//Também irá pro console, já que está configurado para todas as categorias
var acoesLog = log4js.getLogger('acoes');
acoesLog.debug("Usuário fez uma ação!");






 
  
