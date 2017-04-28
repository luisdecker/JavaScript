var Sequelize = require('sequelize');
var sequelize = new Sequelize('teste','root','root');

var PessoaModelo = {
    nome: Sequelize.STRING,
    nascimento: Sequelize.DATE
}
var Pessoa = sequelize.define('pessoa',PessoaModelo);

seuZeca = {
    nome: "Zeca",
    nascimento: new Date(1949,4,1)
}

sequelize.sync({force: true})
    .then( () => {
        return Pessoa.create(seuZeca);
    } )
    .then( () => {
        console.log("Criou seu zeca com sucesso!");
    }).catch( (erro) => {
        console.log("Não criou o seu Zeca :/", erro);
    });


