//Codigo usando algumas funcoes do log4js
'use strict'

//Carrega log4js
const log4js = require('log4js');
//Logger basico
const logger = log4js.getLogger();
//Cospe somente no terminal num formato bonitinho
//[2017-05-12 11:21:47.283] [DEBUG] [default] - Iniciando testes com log4js!
logger.debug("Iniciando testes com log4js!");

log4js.configure({
    appenders:[
        {
            type:'file',
            filename:'log_teste.log',
            category:['teste','console']
        },
        {
            type:'console'
        }
    ],
    replaceConsole: true
});

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('log2_teste.log'),'testes2');

const loggerTeste1 = log4js.getLogger('teste');
//Seta para que níveis menores que WARN não apareçam
/*Níveis em ordem decrescente de prioridades:
    ALL
    FATAL
    ERROR
    WARN
    INFO
    DEBUG
    TRACE
    OFF
*/
loggerTeste1.setLevel("WARN");
//Como redirecionei console ( category:['teste','console'] ), o console.log 
//vai ser redirecionado
console.error("Isto é um exemplo de erro!");
console.log("Isto é um exemplo de log informativo!");
//Estes logs serão enviados também pro arquivo 'log_teste.log'
logger.error("Exemplo de erro documentado!");
logger.warn("Exemplo de uma warning!");
logger.trace("Exemplo de trace!");//Não será guardado, pois está abaixo de WARN.
//Estes logs vão para log2_teste.log
const loggerTeste2= log4js.getLogger('testes2');
loggerTeste2.info("Este foi pra outro log :D");


