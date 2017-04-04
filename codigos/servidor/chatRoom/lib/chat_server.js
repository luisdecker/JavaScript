/**
 * Created by decker on 28/03/17.
 */
var socketIO = require('socket.io');
//Inicialização
var io;
var guestNumber = 1;
var nicknames = {};
var namesUsed = [];
var currentRoom = {};

//Callbacks
function listen(server){
    //Inicia o servidor socket.io, permitindo que ele execute junto com o http.
    io = socketIO.listen(server);
    io.set('log level',1);
    io.sockets.on('connection',function (socket) {
        //Dá um nome de guest para o usuário ao conectar
        guestNumber = assignGuestName(socket,guestNumber,nicknames,namesUsed);
        //Poe o usuário no lobbbu assim que ele conecta.
        joinRoom(socket,'Lobby');
        //Funcoes que lidam com as varias ações
        handleMessageBroadcasting(socket,nicknames);
        handleChangeNameAttempts(socket, nicknames,namesUsed);
        handleRoomJoining(socket);
        //Provê uma lista de salas ocupadas para o usuario sob demanda.
        socket.on('rooms',function () {
            socket.emit('rooms',io.of('/').adapter.rooms);

        });
        handleClientDisconnection(socket,nicknames,namesUsed);

    });

}

exports.listen = listen;


//Funcoes Auxiliares
//Cuida das mensagens dos usuários
function handleMessageBroadcasting(socket,nicknames) {
    socket.on('message', function (message) {
        console.log("HandleMessageBroadcasting:\n",message);
        socket.broadcast.to(message.room).emit('message',{
            text: nicknames[socket.id] + " diz: " + message.text
        });
    });
}
//Dá um nome de guest ao novo usuário
function assignGuestName(socket,guestNumber,nicknames,namesUsed) {
    var name = 'Guest' + guestNumber;
    //Atribui o nome de convidado ao id da conexão
    nicknames[socket.id] = name;
    socket.emit('nameResult', {
        success : true ,
        name:name
    });
    namesUsed.push(name);
    return guestNumber+1;
}
//Logica relacionada a entrar em uma sala
function joinRoom(socket,room) {
    socket.leaveAll();
    socket.join(room);//Poe o usuário na sala
    currentRoom[socket.id] = room; //Atribui a sala como sala atual
    socket.emit('joinResult',{room:room});
    socket.broadcast.to(room).emit('message',{
        text: nicknames[socket.id] + " entrou na sala " + room
    });
    //Verifica quais usuarios estão na sala
    
    var usersInRoom = io.of('/').in(room).clients();
    console.log("Verificando clientes na sala " + room + '\n',usersInRoom.connected);
    //Se tiver alguem na sala, mostrar para quem entrou



    if(usersInRoom.connected.length>1){
        var msgUsersInRoom = "Pessoas atualmente na sala "+ room +"; ";
        for (var index in usersInRoom){
            var userSocketId = usersInRoom.connected[index].id;
            if(userSocketId != socket.id){
                if (index > 0){
                    msgUsersInRoom += ", ";
                }
                msgUsersInRoom += nicknames[userSocketId];
            }
        }
        msgUsersInRoom += ".";
        socket.emit('message',{text:msgUsersInRoom});//Envia a mensagem para o usuário
    }
}
//Trata das requisicoes de mudanca de nome
function handleChangeNameAttempts(socket, nicknames,namesUsed) {
    socket.on('nameAttempt', function (name) {
        if(name.indexOf('Guest') == 0){//Nomes não podem começar com 'Guest'
            socket.emit('nameResult',{
                success: false,
                message: 'Nomes não podem começar com "Guest"'
            })
        }else{//Nome difrente de Guest
            if(namesUsed.indexOf(name) == -1){//Se o nome não estiver na lista
                var nomeAntigo = nicknames[socket.id];
                var nomeAntigoIndex = namesUsed.indexOf(nomeAntigo);
                namesUsed.push(name);//Adiciona o novo nome a lista de nomes usados
                nicknames[socket.id] = name; //Atribui o nome a conexão
                delete namesUsed[nomeAntigoIndex];//Remove o nome antigo da lista de usados, para liberar para futuros clientes
                socket.emit('nameResult',{
                    success: true,
                    name: name

                });
                //Mensagem de troca de nome
                socket.broadcast.to(currentRoom[socket.id]).emit('message',{text:nomeAntigo + " agora se chama " + name});

            }else{//Caso o nome já esteja sendo usado
                socket.emit('nameResult',{
                    success: false,
                    message: "Nome já utilizado!"
                });
            }
        }
    });
}
//Trata a entrada em uma sala
function handleRoomJoining(socket) {
    socket.on('join', function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket,room.newRoom);
    })
}

//Trata da desconexão de um cliente
function handleClientDisconnection(socket,nicknames,namesUsed) {
    socket.on('disconnect',function () {
        var indiceNome = namesUsed.indexOf(nicknames[socket.id]);
        delete namesUsed[indiceNome];
        delete nicknames[socket.id];
    })
}


