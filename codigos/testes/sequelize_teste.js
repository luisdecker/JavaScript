var Sequelize = require('sequelize');
var sequelize = new Sequelize('teste','root','root');

var PessoaModelo = {
    nome: {
        type: Sequelize.STRING
       // unique: 'nome'
    },
    nascimento: Sequelize.DATE
}
var Pessoa = sequelize.define('pessoa',PessoaModelo);

seuZeca = {
    nome: "Zeca",
    nascimento: new Date(1949,4,1)
}
sequelize.sync({force:true})
.then(()=>{
    criarPessoas();
});

var criarPessoas = () => {
    sequelize.sync()
        .then( () => {
            return Pessoa.create(seuZeca);
        } )
        .then( () => {
            console.log("Criou seu zeca com sucesso!");
        }).catch( (erro) => {
            console.log("Não criou o seu Zeca :/", erro);
        });

    donaMaria = {
        nome:'maria',
        nascimento: new Date(1940,1,5)
    }

    sequelize.sync()
        .then( () => {
            return Pessoa.create(donaMaria);
        } )
        .then( () => {
            console.log("Criou Dona Maria com sucesso!");
        }).catch( (erro) => {
            console.log("Não criou a Dona Maria :/", erro);
        });
}
