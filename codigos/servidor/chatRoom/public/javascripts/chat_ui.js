/**
 * Created by decker on 03/04/17.
 */
//Texto que o usuario digita é consiederado texto "inseguro", pois o espertalhão \
//pode estar tentando injetar codigo. Logo, usamos uma funcao do jquerry pra escapar
//o texto e por dentro de uma div.
function divEscapedContentElement(mensagem) {
    return $('<div></div>').text(mensagem);
}

//Texto que vem do servidor é considerado seguro.
function divSystemContentElement(mensagem) {
    return $('<div></div>').html('<b>' + mensagem + '</b>');
}

function processarEntrada(chatApp, socket) {
    var mensagem = $('#send-message').val();
    console.log("processarEntrada: ", mensagem );
    var mensagemSistema;

    if(mensagem.charAt(0) == '/'){
        mensagemSistema = chatApp.processarComando(mensagem);//Caso comece com /, tratar como um comando
        if(mensagemSistema){
            $('#messages').append(divSystemContentElement(mensagemSistema));
        }
    }else{//Se não for um comando
        console.log("Reconheceu uma mensagem: " ,$('#room').text() );
        chatApp.enviarMensagem($('#room').text(),mensagem);//Manda uma mensagem não-comando para os outros usuarios
        $('#messages').append(divEscapedContentElement(mensagem));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');
}

var socket = io.connect();
$('#document').ready(function () {
    var chatApp = new Chat(socket);
    socket.on('nameResult', function (result) {//Mostra os resultados de uma troca de nome
        var mensagem;
        if(result.success){
            mensagem = "Agora você é conhecido como " + result.name + "!";
        }else{
            mensagem=result.message;
        }
        $('#messages').append(divSystemContentElement(mensagem));

    });
    socket.on('joinResult',function (result) {//Mostra os resultados de uma troca de sala
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Sala trocada!'));
    });
    socket.on('message',function (message) {//Mostra uma mensagem
        console.log("Recebeu a mensagem\n>", message);
        var elemento = divEscapedContentElement(message.text);
        $('#messages').append(elemento);
    });
    socket.on('rooms',function (salas) {//Mostra a lista de salas
        $('#room-list').empty();

        for (var sala in salas){

            //sala = sala.substring(1,sala.length);
            if(sala != ''){
                $('#room-list').append(divEscapedContentElement(sala));

            }
        }
        $('#room-list div').click(function () {
            var com = '/join ' + $(this).text();
            console.log('Clicou na sala!\n',com,'\n',$('this').text());
            chatApp.processarComando(com); //Permite entrar numa sala ao clicar no nome dela.
            $('#send-message').focus()
        });
    });
    setInterval(function () {
        socket.emit('rooms');
    },1000);
    $('#send-message').focus();
    $('#send-form').submit(function () {
        processarEntrada(chatApp,socket);
        return false;
    });
});