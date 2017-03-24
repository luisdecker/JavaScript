/**
 * Created by decker on 23/03/17.
 */
/*
 * Exemplo do middleware pattern
 * Uma requisiçao entra no app express e passa por varios middlewares,
 * que podem modificar a requisicao e o ultimo, baseado na logica de negocio,
 * pode devovler uma resposta ou ser um gerente de rotas.
 * */

var express = require('express');
var app = express();

var logHeaders = function (requisicao,resposta,proximo) {
    console.log(requisicao.headers);
    proximo();
};

var setChance = function (requisicao,resposta,proximo) {
    requisicao.chance = Math.random();
    proximo();
};
/*app.use e como o express define middlewares. Toma uma funcao como parametro, sendo que
 * primeiro: requisicao
 * segundo: resposta
 * terceiro: next callback (proximo)
 * Chamando proximo() avisa o express que ele pode pular par o proximo middleware ou gerente de rotas. */
app.use(logHeaders);
app.use(setChance);
app.get('/', function (requisicao,resposta) {
    resposta.json({
        chance:requisicao.chance
    })
});

//Tratamento de erros
/* Para tratar erros, se usa um middleware com quatro parametros,
 onde o erro e incluso como primeiro parametro
 Nota: A funcao de tratamento de erros deve ser inclusa como o ultimo middleware,
 sendo que tem o parametro 'proximo' para poder encadear varios tratadores de erro.
 */

app.use(function (erro,requisicao,resposta,proximo) {
    console.log(erro);
    resposta.status(500).send("Algo errado aconteceu!");
});


app.listen(3000);


