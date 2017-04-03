/**
 * Created by decker on 30/03/17.
 */
//Arquivo responsavel por lidar com as interações de chat

var Chat = function (socket) {
    this.socket = socket;
};

//Mandar uma mensagem para uma sala
Chat.prototype.enviarMensagem = function(sala,mensagem){
    var mesg = {
        text:mensagem,
        room:sala
    };
    this.socket.emit('message',mesg);
};
//Entrar em uma sala
Chat.prototype.entrarNaSala = function (sala) {
    this.socket.emit('join', {newRoom: sala});
};

Chat.prototype.processarComando = function (comando) {
    var palavras = comando.split(' ');
    var comando = palavras[0].substring(1,palavras[0].length).toLowerCase();//retira a provavel "/" e le o comando
    var mensagem = false;
    switch (comando){
        case 'join':
            palavras.shift();//Tira o comando
            var sala = palavras.join(' '); //Junta novamente o nome da sala separado por espaco, sem o comando
            this.entrarNaSala(sala);
            break;
        case 'nick':
            palavras.shift();
            var nome = palavras.join(' ');
            this.socket.emit('nameAttempt', nome);//Emit: envia para o cliente específico
            break;
        default:
            mensagem = "Comando nao reconhecido";
            break;

    }
    return mensagem;
};
