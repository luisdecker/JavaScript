var fs = require('fs')

/*Promisses
A maneira clássica de lidar com eventos assíncrodos em javascript
é usando callbacks. Como por exemplo: 
*/

fs.readFile('file.txt','utf8', function(erro,arquivo){
	if(erro){
		console.log("Erro ao abrir o arquivo!");
	}else{
		console.log(arquivo);
	}
});
/*
Porém, é este tipo de código que gera o famoso "inferno de call-
back". Isso acontece porquê você frequentemente quer fazer algo 
a mais com os dados enviados para a primeira funcao de callback,
gerando assim ainda mais funcoes de callback e gerando assim 
uma penca de callbacks aninhados que atrapalham e muito a legibi-
lidade do código.

Como exemplo o seguinte código, que, assincronamente, lê um ar-
quivo, cria um novo diretorio e entao cria um novo arquivo.
*/

fs.readFile('file.txt','utf8',function(erro,arquivo){
	if(erro){
		console.log("Erro ao abrir o arquivo!", erro);
	}else{
		fs.mkdir('novaPasta',function(erro,arquivo){
			if(erro){
				console.log("Erro ao abrir nova pasta!", erro);
			}else{
				fs.writeFile('novaPasta/novoArquivo.txt',
							function(erro,arquivo){
					if(erro){
						console.log
						("Erro ao criar o arquivo!", erro);
					}else{
						console.log(arquivo);	
					}				
				});		
			}		
		});	
	}
});

/*
Nota-se que os varios callbacks aninhados comprometem a legibi-
lidade do codigo, ainda mais somadas as condicionais. 
A seguir, como resolveriamos o mesmo problema usando Promisses
*/

//Adicionando suporte a promessas ao modulo básico fs
const Promisse = require('bluebird');
fs = Promisse.promisifyAll(require('fs'));


fs.readFileAsync('file2.txt')
.then(function(dados){
	return fs.mkdirAsync('novaPasta2')
})
.then(function(){
	return fs.writeFileAsync('novaPasta2/novoArquivo.txt');
});


/*
Promessas nos permitem lidar com funcoes assincronas de uma ma-
neira muito mais elegante. 
Ao invés de usar um callback, a funcao inicial retorna uma pro-
messa que é "entãozavel" (thenable). ".then" pode ser encadeado
quantas vezes forem necessárias, e cada .then provê a informação
retornada do .then anterior. Tudo que for retornado de um .then
será também "entãozavel", e será, no geral, outra chamada assín-
crona.

Promessas também permitem que você separe seu código em outros 
arquivos. Por exemplo:
*/

function lerArquivoCriarPasta() {
	return fs.readFileAsync('file.txt')
		.then(function (dados) {
			return fs.mkdirAsync('novaPasta3');
		});
}
//O codigo abaixo sera executado assim que o arquivo foi lido e 
//o novo diretorio criado

lerArquivoCriarPasta()
	.then(function () {
		return fs.writeFileAsync('novaPasta3/arquivo.txt');
	});

/*
Este código demonstra que qualquer coisa retornada por um ".then" também é 
"entãozavel". 
*/

/*Lidando com erros
Quando executando através dos vários '.then', se ocorre uma excessão, em qual-
quer ponto, o bluebird irá procurar pelo '.catch' mais proximo para passar o 
erro. Voce pode encadear varios '.catch' a sua cadeia de '.then'. 
Como exemplo:
*/

fs.readFileAsync('file.txt')
	.then((fileData) => {
		return fs.mkdirAsync('novaPasta4');
	})
	.then(() => {
		return fs.writeFileAsync('novaPasta4.arquivo.txt');
	})
	.catch((error)=> {
		console.log(error);
	})
	
/*
No exemplo, os metodos 'writeFileAsync' e 'mkdirAsync' não existem nativamente
no modulo fs (que não retorna promessas por default). Não obstante, o bluebird
tem a capacidade de 'promessificar' modulos que não retornam promessas. Como em

const Promisse = require('bluebird');
fs = Promisse.promisifyAll(require('fs'));

, onde fs é promissificado e retorna uma versao com promessas de fs.
*/

/*
Como você pode promissificar um modulo, geralmente não se cria uma promessa 
"na mão". 

Para criar uma promessa, voce deve passar uma funcao com duas funcoes:
    resolve: funcao que é chamada quando a função dá certo (then)
    reject: funcao que é chamada quando algum erro ocorre: (catch)
    
*/

//var Promisse = require('bluebird');
var fsTradicional = require('fs');
var lerArquivoAssincrono (file) =>{
    return new Promisse((resolve,reject)=>{
        fs.readFile(file,'utf8',(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}












