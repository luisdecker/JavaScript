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
}
