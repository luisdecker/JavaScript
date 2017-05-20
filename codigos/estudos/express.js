/*Roteamento
 Roteamento é a definição de endpoints (URLs) e como eles respondem a requisiçõ-
 es dos clientes. */
//Este código responde com "Hello World" sempre que o servidor recebe um get pa-
//ra a pagina inicial
'use strict'
const express = require('express');
const app = express();

app.get('/', (requisicao,resposta) => {
    resposta.send("Olá, Mundo!")
});

/*Métodos de roteamento
 * Um método de roteamento é derivado de um dos métodos HTTP, e é anexado a uma 
 * instância da classe express.
 */
//Rotas definidas para métodos GET e POST para a raiz do app
//Rota do GET
app.get('/', (requisicao,resposta) => {
    resposta.send("requisicao tipo GET para a homepage!");
});

//Rota do POST
app.post('/',(requisicao,resposta) => {
    resposta.send('requisição tipo POST para a homepage');
});


/*
 O express suporta os seguintes métodos de roteamento (cada um equivalente a um 
 método http): 
 
 get    post    put head    delete  options trace   copy    lock    mkcol
 move   purge   propfind    proppatch   unlock  report  mkactivity  checkout
 merge  m-search    notify  subscribe   unsubscribe patch   search  connect
 
 Para rotear método que gerariam uma variavel js inválida, utilize colchetes
 app['m-search']('/', (req,res)=>{});

 Existe um método especial associado a qualquer requisição http, o app.all().
 Ele é usado para carregar funções de middleware, e vai reponder quaquer requi-
 sição feita para o endereço especificado.
 */
app.all('/segredo', (requisicao,resposta,proximo) => {
    console.log("Entrando na pagina secreta!");
    proximo(); //Passa o controle para o próximo handler
});

/*Caminho da rota
 O caminho da rota, junto com o método de requisição,define  endpoint em que uma 
 requisição será feita. Caminhos de rota podem ser strings, padrões de string ou 
 expressões regulares.
 */

//Vai atender requisições tipo get para a raiz '/'
app.get('/',(requisicao,resposta) => {
    resposta.send('Requisitou root');
})
//Atende requisições para /sobre
app.get('/sobre', (requisicao,resposta) => {
    resposta.send('Requisitou sobre');
})
//Atende requisições para 'acoes.log'
app.get('/acoes.log', (requisicao,resposta) => {
    resposta.send('Requisitou log de acoes');
})

//Caminhos baseados em padrões de string
//Atende 'dashboard' e 'dashboard2'
app.get('/dashboard2?', (requisicao,resposta) => {
    resposta.send('Requisitou um dashboard');
})
//Atende 'batata' , 'batataa', 'batataaa'...
app.get('/batata+', (requisicao,resposta) => {
    resposta.send('Requisitou um tuberculo delicioso!');
})
//Atende 'logDecker.log', 'logRodrigo.log', 'logcnep0qdh830.log' ... 
app.get('/log*.log', (requisicao,resposta) => {
    resposta.send('Requisitou um log!');
})
//Atende 'sobre' e 'sobreEmpresa'
app.get('/sobre(empresa)?', (requisicao,resposta) => {
    resposta.send('Requisitou sobre');
})

//Caminhos baseados em expressões regulares
//Atende qualquer requisiçao com 'log' no nome
app.get(/log/, (requisicao,resposta) => {
    resposta.send('Requisitou algo com log');
})
//Procura qualquer coisa terminada em .log
app.get(/.+\.log/, (requisicao,resposta) => {
    resposta.send('Requisitou um arquivo de log!');
})
/*Parâmetros de rota
 São segmentos nomeados de URL usados para a captura dos valores especificados 
 na sua posição na URL. Os valores valores capturados são populados no objeto 
 'req.params', com o nome do parâmetro especificado no seu caminho como suas
 respectivas chaves.
|==========================================================|
|Route path: /usuarios/:userId/indicador/:indicadorId      |
|Request URL: http://localhost:3000/users/34/indicador/8989|
|req.params: { "userId": "34", "indicadorId": "8989" }     |
|==========================================================|
Para definir parâmetros de rota, simplesmente especifique os parâmetros no cami-
nho da rota
*/
app.get('/usuarios/:userId/indicador/:indicadorId', (requisicao,resposta) => {
    resposta.send(requisicao.params);
});

/*Como os caracteres - e . são interpretados literalmente, podem ser usados jun-
 to com os parâmetros de rota

|==================================================| 
|Route path: /flights/:from-:to                    |
|Request URL: http://localhost:3000/flights/LAX-SFO|
|req.params: { "from": "LAX", "to": "SFO" }        |
|==================================================|

|=========================================================|
|Route path: /plantae/:genus.:species                     |
|Request URL: http://localhost:3000/plantae/Prunus.persica|
|req.params: { "genus": "Prunus", "species": "persica" }  |
|=========================================================|
*/

/*Tratadores de rotas
É possível encadear vários callbacks para tratamento de uma requisição. Apesar 
de uma requisição poder ser atendida completamente com apenas um tratador, 
encadear vários deles permite especializar tratadores para vários casos, tornan-
do-os mais reutilizáveis e facilitando a manutenção dos mesmos. 
 */
//Um tratador pode cuidar sozinho de uma requisição
app.get('/exemplo/a',(requisicao,resposta) => {
    resposta.send("Olá A!");
})
//Ou, mais de uma função de callback pode ser usada para tratar uma requisicao,
//lembrando que precisamos especificar o objeto next.
app.get('exemplo/b', (requisicao,resposta,proximo) =>{
    console.log("A requisição será tratada pelo proximo callback");
}, (requisicao,resposta)=> {
    resposta.send("Olá B!");
});

//Várias funcoes de callback podem ser postas num array e o mesmo ser o parame-
//tro da construção do tratador de requisição
var cb1 = (requisicao,resposta,proximo){
    console.log("Passando pelo callback 1!");

    
}
var cb2 = (requisicao,resposta,proximo){
    console.log("Passando pelo callback 2!");
}
var cb3 = (requisicao,resposta,proximo){
    console.log("Callback 3 respondendo!");
    resposta.send("Olá Callback 3!");
}
app.get('/exemplo/c',[cb1,cb2,cb3]);
//Também podemos combinar 
app.get('exemplo/d', (req,res,next) => {
    console.log('Callback primario executado!');
    next();
},[cb1,cb2,cb3]);

/*Métodos de resposta
 Os métodos do objeto resposta(res) podem enviar uma resposta para o cliente,
 e terminar o cliclo de requisição-resposta. Se nenhum destes métodos for chama-
 do na cadeia de tratadores de rota, a requisicao do cliente ficara pendente.
 */

res.download(); //Requisita o download de um arquivo
res.end();//Termina o processo de reposta
res.json();//Envia um JSON como resposta
res.jsonp();//Envia um JSON como resposta (suporta JSONP)
res.redirect();//Redireciona uma requisição
res.render();//Renderiza uma view template
res.send();//Envia uma resposta de vários tipos
res.sendFile();//Envia um arquivo como stream de octetos
res.sendStatus();//Seta o código de status da resposta e envia sua representação
                 //em string como o corpo da resposta.

/*app.route()
 É possível encadear vários tratadores para uma rota usando 'app.route()'. Como
 o caminho é especificando em um lugar só, criar rotas modulares é útil, redu-
 zindo redundancia. 
 */
app.route('/indicador')
.get((req,res)=>{res.send("Enviar indicador")})
.post((req,res)=>{res.send("Criar novo indicador")})
.put((req,res)=>{res.send("Atualizar um indicador")});

/*express.Router
utilize oexpress.Router para criar um tratador de rota modular e ligável. 
Uma instancia de Router é um middleware e sistema de roteamente completo. Por 
esta razão, pode ser chamado de 'mini-app'.
 */
//Podemos criar um Router para lidar com indicadores
const express = require('express');
const router = express.Router();

//Especifico para este router
router.use( (req,res,next) =>{
    console.log("Data:", Date.now());
    next();
})
//Rota para a pagina principal
router.get('/', (req,res) => {
    res.send("Plape BI!");
})
//Rota para configuracoes
router.get('/config', (req,res)=>{
    res.send("Configure seu Dashboard!");
})

module.exports = router;

//Então, carregar o módulo do router no app principal
var Plape = require('./Plape')
//...
app.use("/plape",Plape);
//app agora será capaz de tratar requisições para /plape, /plape/config e chamar
//o middleware de log de tempo que é especificado para a rota

/*Middlewares
 Uma função de middleware é uma funcao que tem acesso aos objetos de requisicao
 (req), de resposta (res) e a proxima funcao no ciclo de requisicao-resposta.
 Um middleware pode:
    ->Executar código
    ->Executar mudanças no objeto de requisição e de resposta
    ->Terminar o cliclo requisicao-resposta
    ->Chamar o proximo middleware na pilha
 */
//Como exemplo, um middleware que nao faz nada com os objetos, só loga a passa-
//gem

var logger = (req,res,next) => {
    console.log("Passou pelo logger!");
    next();
}
//Para usar a funçao de middleware, chame app.use(), especificando uma funcao
//de middleware. 

app.use(logger);

app.get('/', (req,res)=>{
    res.send("Olá!");
})

app.listen(8080);
//Assim ,cada vez que o app receber uma requisição, o logger será chamado e irá
//printar a sua mensagem

//Outro exemplo: iremos criar uma funcao "request time", que adiciona uma propi-
//edade no objeto de requisição

var requestTime = (req,res,next){
    req.requestTime = Date.now();
    next();
}

//Agora, o tratador de rota da raiz utiliza esta propiedade

app.use(requestTime);

app.get('/',(req,res)=>{
    res.send("Requisição feita em " + req.requestTime);
});

app.listen(8080);
