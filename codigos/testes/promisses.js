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







