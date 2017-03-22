/**
 * Created by decker on 21/03/17.
 */
/*Algums testes utilizando a caracteristica de programaçao assincrona oferecida pelo node.js
 Este primeiro exemplo utiliza uma leitura sincrona do arquivo:
 o node esta bloqueado ate o fim da operacao de leitura do arquivo estar completa*/

var fs = require('fs'); //importa o modulo responsavel por I/O de arquivos
var conteudo;

conteudo = fs.readFileSync('server.js','utf-8'); //Le o fonte do servidor hello world

//console.log(conteudo);

/*
 * Este segundo exemplo utiliza as ferramentas de programaçao assincrona*/

var callback = function (err,conteudo) { //Esta funcao e a que sera chamada assim que o processo de leitura terminar
    if(err){return console.log(err)}
    console.log(conteudo);
};

fs.readFile('server.js','utf-8',callback);//Le assincronamente o arquivo, e chama "callback" assim que termina
console.log("Sera que serei printado antes ou depois?");//Geralmente e printado antes, pq a leitura de arquivo e mais demorada
