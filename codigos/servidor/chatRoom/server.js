/*Exemplo de um servidor para um serviço de bate-papo com multiplas salas*/
//Importacao de bibliotecas
var http  = require('http'); //Funcionalidade de http
var fs = require('fs');//Funcionalidades de sistemas de arquivo
var path = require('path');//O modulo path fornece fucionalidades referentes a caminhos
var mime = require('mime'); //Funcionalidade de derivar o MIMEtype de um arquivo pela sua extensao
//Cache e onde o conteudo de arquivos em cache sao guardados
var cache = {};
//Funcoes auxiliares
//Envia um erro 404 quando uma solicitaçao de arquivo inexistente ocorre
function send404(response){
    response.writeHead(404,{'Content-Type': 'text/plain'});
    response.write("Erro 404: Recurso não encontrado");
    response.end();
}
//Envia os dados de um arquivo
function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200,
        {'Content-Type': mime.lookup(path.basename(filePath))}

    );
    response.end(fileContents);
}
//Responde a requisição de um arquivo estático
function serveStatic(response, cache, absPath) {
    if(cache[absPath]){//Verifica se o arquivo já está em cache
        sendFile(response,absPath,cache[absPath]);//Envia o arquivo em cache para o cliente
        console.log("Mandou cache ", absPath);

    }else{
        fs.exists(absPath,function (exists) {//Verifica se o arquivo existe, e envia a reposta para um função callback
            if(exists){
                //FileRead callback
                function readFunc(err,data) {
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath]= data;
                        sendFile(response,absPath,data);
                        console.log('Mandou novo ', absPath);
                    }
                }//-----
                fs.readFile(absPath,readFunc);
            }else{
                send404(response);
            }

        });

    }

}
function httpServer(request,response){
    if(request.url ==='/'){//Pagina de resposta padrão (Para o servidor, o sistema de arquivos começa nele)
        filePath ='public/index.html'; //Determina qual html será servido por padrão
        console.log('serviu ',filePath );
    }else{
        filePath = 'public' + request.url;//Procura o arquivo solicitado dentro da pasta de html.
    }
    var absPath = './' + filePath;
    serveStatic(response,cache,absPath);//Serve o arquivo estático.
}

var server = http.createServer(httpServer);
server.listen(3000,function () {
    console.log("Servidor iniciado!");
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);



