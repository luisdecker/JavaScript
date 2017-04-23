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
/*Modelos globais
O construtor do sequelize recebe uma opção 'define' que sera usada como opções
default para todos os modelos definidos
*/
var sequelize = new Sequelize ('urlConexao', {
    define: {
        var timestamps:false //Por default é true
    }
});

var User = sequelize.define('usuario',{});//Timestamps é false por default
var Post = sequelize.define('post', {},{
    timestamps: true //Para este modelo, timestamps é true
});
/*Promessas
Sequelize utiliza o conceito depromessas para os controles assincronos de fluxo.
*/
//NÃO USE ISSO
user = User.findOne();
console.log(user.get('nome'));
/*
Isto não iria funcionar, porque user é uma promessa, e não um dado cru do banco.
O jeito certo de fazer isso seria:
*/
User.findOne().then( (user) => {
    console.log(user.get('nome'));
});

/*Sincronização
sequelize.sync()
    Baseado nas suas definições de modelo, vai criar quaisquer tabelas que fal-
    tem. Com 'force: true', vai antes dropar as já existentes.
*/

/*Definição
Para definir mapeamentos entre um modelo e uma tabela, use o metodo 'define'.
Os atribuitos 'createdAt' e 'updatedAt' são automaticamente inseridos, tornando
possível saber quando uma entrada de dados foi para o banco e quando foi atuali-
zado a ultima vez. 
*/

/*Acho mais limpo definir em duas vars do que usar um objeto inline*/
var projetoModelo = {
    titulo: Sequelize.STRING,
    descricao: Sequelize.TEXT
}
var Projeto = sequelize.define('projeto', projetoModelo);

var tarefaModelo = {
    titulo: Sequelize.STRING,
    descricao: Sequelize.TEXT,
    deadline: Sequelize.DATE
}
var Tarefa = sequelize.define('tarefa',tarefaModelo);

/*
Também é possivel adicionar opcoes para cada coluna (atributo)
*/

var fooModelo ={
    //Ao instanciar, flag vai ser true se nao for setada
    flag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    //Valor defaul para data: hora atual
    data: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    //Setando allowNull para false poe 'NOT NULL' na tabela, gerando assim um
    //erro de banco de dados se for passado um valor null
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //Podemos setar uma propriedade como unique 
    umUnique: {
        type: Sequelize.STRING,
        unique: true
    },
    //E podemos passar uma string como unique. Assim, formam uma chave unica 
    //composta
    unique1: {
        type: Sequelize.STRING,
        unique: 'indiceComposto'
    },
    unique2: {
        type: Sequelize.STRING,
        unique: 'indiceComposto'
    },
    //Chaves primárias
    identificador: {
        type: Sequelize.INTEGER, 
        primaryKey: true
    },
    //Inteiros auto-incrementais
    incremental: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    //Comentarios podem ser especificados para cada camp para MySQL e Postgres
    comentado: {
        type: Sequelize.INTEGER,
        comment: "Um campo comentado!"        
    },
    //É possivel especificar o nome de um campo usando 'field'
    campoPersonalizado:{
        type: Sequelize.INTEGER,
        field: "campo_personalizado"
    },
    //É possivel criar chaves estrangeiras
    id_coisa:{
        type: Sequelize.INTEGER,
        references: {
            //Referencia para outro modelo
            model: Coisa,
            //Aa chave no modelo referenciado
            key: 'id_coisa'
        }    
    }; 
}

/*Tipos de dados
Os principais tipos de dados aceitos pelo sequelize são apresentados a seguir.
Para uma lista mais completa e atualizada, refira-se ao manual.
[http://docs.sequelizejs.com/en/v3/api/datatypes]
*/
Sequelize.STRING                      // VARCHAR(255)
Sequelize.STRING(1234)                // VARCHAR(1234)
Sequelize.STRING.BINARY               // VARCHAR BINARY
Sequelize.TEXT                        // TEXT
Sequelize.TEXT('tiny')                // TINYTEXT

Sequelize.INTEGER                     // INTEGER
Sequelize.BIGINT                      // BIGINT
Sequelize.BIGINT(11)                  // BIGINT(11)

Sequelize.FLOAT                       // FLOAT
Sequelize.FLOAT(11)                   // FLOAT(11)
Sequelize.FLOAT(11, 12)               // FLOAT(11,12)

Sequelize.REAL                        // REAL        PostgreSQL only.
Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.

Sequelize.DOUBLE                      // DOUBLE
Sequelize.DOUBLE(11)                  // DOUBLE(11)
Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)

Sequelize.DECIMAL                     // DECIMAL
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)

Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision 
Sequelize.DATEONLY                    // DATE without time.
Sequelize.BOOLEAN                     // TINYINT(1)

Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.

Sequelize.JSON                        // JSON column. PostgreSQL only.
Sequelize.JSONB                       // JSONB column. PostgreSQL only.

Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)

Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)

Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.

Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.

Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT')           // Spatial column with geometry type.  PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geometry type and SRID.  PostgreSQL (with PostGIS) or MySQL only.

/*
O tipo de dados BLOB permita que voce insira dados tanto como strings assim como
buffers. Quando se executa 'find' ou 'findAll' em um modelo que contenha uma
colina BLOB, o dado será sempre retornado como um buffer.

Em adicao aos tipos citados, integer, bigint, float e double tambem aceitam as 
propiedades 'zerofill' e 'unisgned'[Com excessão do PostgreSQL]
*/

Sequelize.INTEGER.UNSIGNED              // INTEGER UNSIGNED
Sequelize.INTEGER(11).UNSIGNED          // INTEGER(11) UNSIGNED
Sequelize.INTEGER(11).ZEROFILL          // INTEGER(11) ZEROFILL
Sequelize.INTEGER(11).ZEROFILL.UNSIGNED // INTEGER(11) UNSIGNED ZEROFILL
Sequelize.INTEGER(11).UNSIGNED.ZEROFILL // INTEGER(11) UNSIGNED ZEROFILL

/*Getters e Setters
É possivel criar getters e setters para as propiedades dos objetos nos seus
modelos. Estas funcoes podem ser usadas tanto para 'proteger' propiedades que
mapeiam para campos no banco de dados ou para criar pseudopropiedades.
*/
//Definido como parte de uma propiedade
var empregadoModelo = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        get: () => {
            var titulo = this.getDataValue('titulo');
            return this.getDataValue('nome') + ' (' + titulo + ")";
        }
    },
    titulo: {
        type : Sequelize.STRING,
        allowNull: false,
        set: (valor) => {
            this.setDataValue('titulo',valor.toUpperCase());
        }
    }    
};

var Empregado = sequelize.define('empregado', empregadoModelo);

var novoEmpregado = {
    nome:"Zeca Pagordinho",
    titulo:"Pagodeiro"
};

var printaEmpregado = (empregado) => {
    console.log(empregado.get('nome'));
    console.log(empregado.get('titulo'));
}

Empregado
    .create(novoEmpregado)
    .then(printaEmpregado);

//Versão de empregadoModelo com os getters e setters como opcoes do modelos

empregadoModelo = {
    nome: {
        type: Sequelize.STRING,
        allowNull = false
    },
    titulo = {
        type: Sequelize.STRING,
        allowNull = false
    },
      
};

empregadoModeloOpcoes = {
    getterMethods:{
        nomeCompleto: (valor) => {
            var titulo = this.getDataValue('titulo');
            return this.getDataValue('nome') + ' (' + titulo + ")";
        }
    },
    setterMethods: {
        //Aqui os setters
    }
};

var Empregado = sequelize.define('empregado', empregadoModelo,
                                 empregadoModeloOpcoes);








