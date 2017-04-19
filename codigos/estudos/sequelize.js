/*SEQUELIZE
Sequelize é um módulo para o NodeJS para mapeamento objeto-relacional (ORM).  
Suportando os dialetos PostgresSQL, MySQL, MariaDB, SQLite e MSSQL, suporta 
transações sólidas, relações, replicação de leituras e mais.

Exemplo de uso:
*/
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username','password');

var user = sequelize.define('user',{
	username: Sequelize.STRING,
	birthday: Sequelize.DATE
});

sequelize.sync().then(()={
	return User.create({
		username: 'janedoe',
		birthday: new Date(1992,7,17)
	});
}).then((usr)=>{
	console.log(usr.get({
		plain: true
	}));
});
/*
O sequelize cria uma pool de conexões na inicialização, logo, idealmente,
somente uma instancia é criada para cada database.
*/
var sequelize = new Sequelize ('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
	pool:{
		max: 5,
		min: 0,
		idle: 10000
	}
});
//Ou então usar uma connection url
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

/*
Modelos são criados utilizando 
	sequelize.define('nome',{atributos},{opcoes})
*/

var User = sequelize.define('user', {
	nome: {
		type: Sequelize.STRING,
		field: 'first_name' //Resulta em nome em js e first_name no bd
	}
	lastName: {
		type: Sequelize:STRING
	}
},//fim dos atributos
{
	freezeTableName: true //Nome na tabela vai ser o nome do modelo
});

User.sync({force: true}).then(()=>{
//Tabela criada
	return User.create({
		nome: "Zeca",
		lastName: 'Pagordinho'
	});
});

