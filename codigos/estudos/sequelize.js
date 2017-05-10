/*SEQUELIZE
Sequelize ? um m?dulo para o NodeJS para mapeamento objeto-relacional (ORM).  
Suportando os dialetos PostgresSQL, MySQL, MariaDB, SQLite e MSSQL, suporta 
transa??es s?lidas, rela??es, replica??o de leituras e mais.

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
O sequelize cria uma pool de conex?es na inicializa??o, logo, idealmente,
somente uma instancia ? criada para cada database.
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
//Ou ent?o usar uma connection url
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

/*
Modelos s?o criados utilizando 
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
O construtor do sequelize recebe uma op??o 'define' que sera usada como op??es
default para todos os modelos definidos
*/
var sequelize = new Sequelize ('urlConexao', {
    define: {
        var timestamps:false //Por default ? true
    }
});

var User = sequelize.define('usuario',{});//Timestamps ? false por default
var Post = sequelize.define('post', {},{
    timestamps: true //Para este modelo, timestamps ? true
});
/*Promessas
Sequelize utiliza o conceito depromessas para os controles assincronos de fluxo.
*/
//N?O USE ISSO
user = User.findOne();
console.log(user.get('nome'));
/*
Isto n?o iria funcionar, porque user ? uma promessa, e n?o um dado cru do banco.
O jeito certo de fazer isso seria:
*/
User.findOne().then( (user) => {
    console.log(user.get('nome'));
});

/*Sincroniza??o
sequelize.sync()
    Baseado nas suas defini??es de modelo, vai criar quaisquer tabelas que fal-
    tem. Com 'force: true', vai antes dropar as j? existentes.
*/

/*Defini??o
Para definir mapeamentos entre um modelo e uma tabela, use o metodo 'define'.
Os atribuitos 'createdAt' e 'updatedAt' s?o automaticamente inseridos, tornando
poss?vel saber quando uma entrada de dados foi para o banco e quando foi atuali-
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
Tamb?m ? possivel adicionar opcoes para cada coluna (atributo)
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
    //Chaves prim?rias
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
    //? possivel especificar o nome de um campo usando 'field'
    campoPersonalizado:{
        type: Sequelize.INTEGER,
        field: "campo_personalizado"
    },
    //? possivel criar chaves estrangeiras
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
Os principais tipos de dados aceitos pelo sequelize s?o apresentados a seguir.
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
colina BLOB, o dado ser? sempre retornado como um buffer.

Em adicao aos tipos citados, integer, bigint, float e double tambem aceitam as 
propiedades 'zerofill' e 'unisgned'[Com excess?o do PostgreSQL]
*/

Sequelize.INTEGER.UNSIGNED              // INTEGER UNSIGNED
Sequelize.INTEGER(11).UNSIGNED          // INTEGER(11) UNSIGNED
Sequelize.INTEGER(11).ZEROFILL          // INTEGER(11) ZEROFILL
Sequelize.INTEGER(11).ZEROFILL.UNSIGNED // INTEGER(11) UNSIGNED ZEROFILL
Sequelize.INTEGER(11).UNSIGNED.ZEROFILL // INTEGER(11) UNSIGNED ZEROFILL

/*Getters e Setters
? possivel criar getters e setters para as propiedades dos objetos nos seus
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

//Vers?o de empregadoModelo com os getters e setters como opcoes do modelos

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
/*Funcoes auxiliares
Existem funcoes auxiliares que podem ser utilizadas dentro de getters e setters

Para pegar o valor de uma propiedade, use 
*/
this.getDataValue('propiedade');
/*
Para setar uma propiedade, use
*/
this.setDataValue('propiedae',dadosNovos)

/*Valida??o
A valida??o de modelo permite especificar validacoes de formato/modelo/heranca
para cada atributo do modelo. 
*/

var validacaoModelo = {
    foo:{
        type: Sequelize.STRING,
        validate: {
            is: ["^[a-z]+$",'i'],     // will only allow letters
            is: /^[a-z]+$/i,          // same as the previous example using real RegExp
            not: ["[a-z]",'i'],       // will not allow letters
            sEmail: true,            // checks for email format (foo@bar.com)
            isUrl: true,              // checks for url format (http://foo.com)
            isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
            isIPv4: true,             // checks for IPv4 (129.89.23.1)
            isIPv6: true,             // checks for IPv6 format
            isAlpha: true,            // will only allow letters
            isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
            isNumeric: true,          // will only allow numbers
            isInt: true,              // checks for valid integers
            isFloat: true,            // checks for valid floating point numbers
            isDecimal: true,          // checks for any numbers
            isLowercase: true,        // checks for lowercase
            isUppercase: true,        // checks for uppercase
            notNull: true,            // won't allow null
            isNull: true,             // only allows null
            notEmpty: true,           // don't allow empty strings
            equals: 'specific value', // only allow a specific value
            contains: 'foo',          // force specific substrings
            notIn: [['foo', 'bar']],  // check the value is not one of these
            isIn: [['foo', 'bar']],   // check the value is one of these
            notContains: 'bar',       // don't allow specific substrings
            len: [2,10],              // only allow values with length between 2 and 10
            isUUID: 4,                // only allow uuids
            isDate: true,             // only allow date strings
            isAfter: "2011-11-05",    // only allow date strings after a specific date
            isBefore: "2011-11-05",   // only allow date strings before a specific date
            max: 23,                  // only allow values <= 23
            min: 23,                  // only allow values >= 23
            isArray: true,            // only allow arrays
            isCreditCard: true,       // check for valid credit card numbers
            
            //? poss?vel tambem criar funcoes personalizadas de validacao
            
            ehUm: (valor) => {
                if(parseInt(valor) != 1){
                    throw new Error("N?o ? um!")
                }
            }
        }
    }
};

Sequelize.define("foo", fooModelo);
/*
Note que quando multiplos argumentos s?o enviados para uma funcao de validacao
built-in, eles s?o passados com um array. Quando se deseja passar um array como 
argumento, passe ele como o unico elemento de um outro array.
*/
isIn: [[1,2,3]]
/*
Para utilizar uma mensagem personalizada ao inves da prvida pelo validator.js,
use um objeto ao inves do argumento 
*/
//Para um validador sem agumentos:
isInt: {
    msg: "Precisa ser inteiro!"
}
//Para validadores que exigem argumentos:
isIn:{
    args: [['batata','cenoura','bacon']]
    msg: "Precisa ser gostoso!"
}

/*
A valida?ao pode ser uma valida??o de modelo, verificando por exemplo se dois 
parametros estao simultaneamente nulos ou nao nulos, 
*/

var pubModelo = {
    nome:{
        type: Sequelize.STRING
    },
    endereco:{
        type: Sequelize.STRING
    },
    latitude:{
        type: Sequelize:INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            min: -90,
            max: 90
        }
     },
     longitude:{
        type: Sequelize:INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            min: -180,
            max: 180
        }
     }
}

var Pub = Sequelize.define('pub',pubModelo,{
    validate: {
        ambasCoordenadas = () => {
            if((this.latitude === null)!== (this.longitude === null)){
                throw new Error("Requer Latitude e Longitude ou nenhum");
            }
        }
    }
});

/*Configura??es de tabela
? poss?vel configurar a maneira que o sequelize lida com os nomes de colunas:
*/

var Algo = Sequelize.define('algo',{/*Definicao*/},{
    //N?o adicionar os timestamps (updatedAt, createdAt)
    timestamps: false,
    //N?o deletar as tuplas, mas sim inserir um atributo 'deletedAt' que vai 
    //receber a data atual assim que for deletado. S? funcionar? se timestamps
    //estiver ativado
    paranoid: true,
    //N?o usar camelCase e sim underscore_names
    underscored: true,
    //Por default, o sequelize utiliza o primeiro parametro do define como 
    //nome da tabela e passa para o plural. Com 'freezeTableName', n?o faz isso.
    freezeTableName: true,
    //Tamb?m ? possivel setar um nome personalizado para as tabelas
    tableName: 'meu_nome_de_tabela',
    //Pode trocar o nome dos timestamps
    updatedAt: "atualizado_em",
    //Pode retirar um dos timestamps
    createdAt: false,
    //Pode criar um comentario na tabela (MySQL|PostgreSQL)
    comment: "Esta tabela ? tabeluda!"
});

/*Importacao
? possivel separar os modelos em pastas diferentes, facilitando reuso e a 
organiza??o
*/
//No arquivo pricipal
var Projeto = sequelize.import(diretorio + '/caminho/para/modelos');

//Nos arquivos de modelos
module.exports = (sequelize,DataTypes) => {
    return sequelize.define('projeto', {
        nome: DataTypes.STRING,
        descricao: DataTypes.TEXT
    })
}

/*Sincroniza??o do banco de dadosNovos
Quando se comeca um novo projeto, n?o se tem a estrutura do banco, e usando 
sequelize n?o ? necessario ter. Somente especifique o seu modelo e deixe 
a lib fazer o resto.
Atualmente ? suportado a cria??o e dele??o de tabelas.
*/
//Criar as tabelas
Projeto.sync();
Tarefa.sync();
//For?ar a criacao (dropa a tabela e depois recria)
Projeto.sync({force: true});
//Dropa as tabelas
Projeto.drop();
Tarefa.drop();
//Tratamento de eventos
Projeto.sync().then(() => {
//O que fazer se tudo deu certo
}).catch( (erro) => {
//o que fazer se der algum erro
})

/*
Tamb?m ? possivel sincronizar/dropar todas as tabelas definidas pelo modelo
Lebrando que as funcoes de Sync e Drop s?o promisses.
*/
//Sincroniza todas as tabelas
sequelize.sync();
//For?a a sincronizacao de todas as tabelas
sequelize.sync({force:true});
//Dropa todas as tabelas
sequelize.drop();

/*Busca de dados
Os m?todos de busca servem para obter os dados do banco.
Estes m?todos n?o retornam dados crus, e sim inst?ncias do modelo. Como os m?to-
dos de busca retornam instancias do modelo, ? poss?vel chamar qualquer membro
do resultado.
*/

/*Find
Procura por um elemnto espec?fico no banco de dados
*/

//Procura por id's conhecidos 
//projeto ser? uma instancia de Projeto, e armazenara o conte?do da tupla com
//id 123. Se esta tupla nao estiver definida, retorna null.
Projeto.findById(123)
    .then((projeto) => {/*Faz algo com projeto*/});
    
//Procura por atributos
//projeto ser? a primeira entrada da tabela com titulo 'UmProjeto' ou null
Projeto.findOne({
    where: {
        title: 'UmProjeto'
    }
}).then( (projeto) => {/*Faz algo com projeto*/});

//Neste caso, projeto.titulo vai ter o nome do projeto
Projeto.findOne({
    where: {
        title:'UmProjeto'
    }
    attributes:[id, ['nome','titulo']];
});

/*findOrCreate
Este metodo pode ser usado para checar se um dado elemento j? existe no banco.
Caso exista,ir? retornar esta inst?ncia. Caso contr?rio, ir? cria-la.
*/
Usuario.findOrCreate(
    where:{
        nome: "Zeca"
    },
    defaults:{
        funcao:"Analista de Sistemas"
    }    
).spread( (usuario,criado) => {
    //Vai imprimir os dados do usu?rio, e caso tenha sido criado agora, criado
    //ser? 'true'
    console.log(usuario.get({plain: true}),criado);
});

/*findAndCountAll
Procura por multiplos elementos no banco, retorna tanto os dados quanto a conta-
gem.
*/
Projeto.findAndCountAll({
    where: {
        titulo: {
            $like: "Implementacao%"
        }
    },
    offset: 10,
    limit: 2
}).then((resultado) => {
    console.log(resultado.count);
    console.log(resultado.rows)
});

/*
findAndCountAll tamb?m aceita includes (Chaves estrangeiras).
Somente includes marcados como 'required' serao contados

suponha que voce queira achar todos os usuarios com perfis
*/

Usuario.findAndCountAll({
    include:[
        {
            model: Perfil,
            required: true
        }
    ],
    limit:3
});

/*
Como o include de Perfil foi marcado como 'required', a pesquisa resultar? 
em um inner join, e somente os usuarios que tiverem um perfil ser?o contados.
Se removermos o required do include, tanto usu?rios que tenham e que n?o tenham
perfis ser?o contados.

Adicionando uma clausula where ao include automaticamente marca o mesmo como 
required.
*/

Usuario.findAndCountAll({
    include:[
        {
            model: Profile,
            where:{
                active:true
            }
        }        
    ],
    limit: 3
});
/*
Esta query contara somente os usuario que tem um perfil ativo, j? que required
? implicitamente setado como true quando uma clausula where ? adicionada ao 
include.

O objeto de op??es passado ao findAndCountAll ? o mesmo que para findAll
*/

/*findAll
Procura por m?ltiplos elementos no banco de dados.
*/

//Procura multiplas entradas
Projeto.findAll().then( (projetos) => {/*projetos ser? um array de Projetos*/} )
//Outra sintaxe
Projeto.all().then( (projetos) => {/*projetos ser? um array de Projetos*/} )
//Procura por atributos espec?ficos (usa hash)
Projeto.all({
    where: {name: "Projeto Maneiro"}
}).then( (projetos)=> {/*...*/})
//Procura com substitui??o de strings
Projeto.all({
    where: ["id > ?",14]
}).then(/*Funcao*/)
//Procura com um certo intervalo
Projeto.all({
    where: {id: [1,2,3,4]}
}).then(/*funcao*/);
//Colinha ;)
Project.findAll({
  where: {
    id: {
      $and: {a: 5}           // AND (a = 5)
      $or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
      $gt: 6,                // id > 6
      $gte: 6,               // id >= 6
      $lt: 10,               // id < 10
      $lte: 10,              // id <= 10
      $ne: 20,               // id != 20
      $between: [6, 10],     // BETWEEN 6 AND 10
      $notBetween: [11, 15], // NOT BETWEEN 11 AND 15
      $in: [1, 2],           // IN [1, 2]
      $notIn: [1, 2],        // NOT IN [1, 2]
      $like: '%hat',         // LIKE '%hat'
      $notLike: '%hat'       // NOT LIKE '%hat'
      $iLike: '%hat'         // ILIKE '%hat' (case insensitive)  (PG only)
      $notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)
      $overlap: [1, 2]       // && [1, 2] (PG array overlap operator)
      $contains: [1, 2]      // @> [1, 2] (PG array contains operator)
      $contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)
      $any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
    },
    status: {
      $not: false,           // status NOT FALSE
    }
  }
})

/*Filtragem complexa e queries OR/NOT 
? poss?vel criar buscas complexas aninhando varios n?veis de AND, OR e NOT.
Para fazer isso, use $or, $and e $not
*/
//Nome = "umProjeto" AND id em [1,2,3] OU id > 10
Projeto.findOne({
    where: {
        nome: "um projeto",
        $or: [
            {id: [1,2,3]},
            //[1,2,3] tamb?m funciona.
            {id: {$gt: 10} }
        ]
    }
});
//Exemplo com um n?o
Projeto.findOne({
    where:{
        nome: "Batatinha",
        $not: [
            {id: [1,2,3]},
            {array: {contains: [3,4,5]} }
        ]
    }
});
/*Isto gerar?
SELECT *
FROM `Projetos`
WHERE (
  `Projetos`.`nome` = 'Batatinha'
   AND NOT (`Projetos`.`id` IN (1,2,3) OR `Projetos`.`array` @> ARRAY[3,4,5]::INTEGER[])
)
LIMIT 1;

*/

/*Manipulando o dataset
Para obter dados mais relevantes, podemos manipular o banco usando:
    limit
    offset
    order
    grouping
*/
//Limita os resultados de uma query a 10
Projeto.findAll( {limit: 10} );
//Pula os dez primeiros resultados
Projeto.findAll( {offset: 10} );
//Pula os dez primeiros e pega os 2 proximos
Projeto.findAll( {offset:10, limit:2 } );
/*
A sintaxe para agrupamento e ordena??o s?o iguais, ou seja, tudo que ? feito com
'group' pode tamb?m ser feito com 'order'
*/
//ORDER BY titulo DESC
Projeto.findAll( {order: 'titulo DESC'} );
//GROUP BY nome
Projeto.findAll( {group: 'nome'} );
/*
Note que o nome das colunas ser? inserido assim como est? na query. Quando uma 
sting ? passada para o order/group, esse sempre ser? o caso. Se for desejado
nomes de colunas escapados ('nome'), dever? ser passado um array de argumentos,
mesmo que seja somente um.
*/
Projeto.findOne({
    order: [
        'nome', //retorna 'nome'
        'usuario DESC', //retorna 'usuario DESC' << NUNCA FA?A ISSO
        ['username','DESC'],// 'username' DESC
        sequelize.fn('max',sequelize.col('idade')),// max('idade')
        [sequelize.fn('max',sequelize.col('idade')), 'DESC']//max('idade') DESC 
    
    ]
})
/*Queries puras
 * Caso voce queira simplesmente acessar o banco passando uma query feita na 
 * m?o, ? poss?vel usar o atributo 'raw'. Ele n?o cria manipuladores para cada
 * dado, somente mostra dados puros.
 */
Projeto.findAll({
    where: {...},
    raw: true
})

/*Count
 *Existe tamb?m um metodo para contar o numero de ocorrencias no banco
 */

Projeto.count()
    .then( (c) => {
        console.log("Temos " + c + " projetos!");
    })
Projeto.count({
    where: ["id > ?",25]
}).then( (c) => {
    console.log("Temos " + c + " projetos com id maior de 25  ")
})

/*MAX
 * Pega o maior valor de um atributo espec?fico em uma tabela
 */

Projeto.max('custo')
    .then( (max) => {
        //max ter? o valor do maior custo
    });
    
Projeto.max('custo', {
    where:{
        integrantes: {
            $lt: 20
        }
    }
}).then((max) => {
    //Max ser? o maior custo de um projeto com menos de 20 integrantes
})

/*MIN
 * Semelhante ao max, mas pega o m?nimo
 */

Projeto.min('custo')
    .then( (min) => {
        //Menor custo
    });
Projeto.min('custo',{
    where:{
        integrantes:{
            $gt:20
        }
    }
}).then((min) => {
    //menor custo de um projeto com mais de 20 pessoas
})
/*SUM
 * Calcula a soma de uma coluna
 */

Projeto.sum('integrantes')
    .then( (sum) => {
        //Soma de todos os integrantes
    });
Projeto.sum('integrantes', {
    where:{
        custo:{
            $gt:5*1000000
        }
    }
}).then((sum)=>{
    //Soma de todos os integrantes de projetos de mais de 2 MI 
})

/*Eager Loading "Carregamento Ansioso"
Quando estamos pegando dados do banco, tem um grande chance que queraimos tam-
b?m obter associa??es com a mesma query: isto se chama 'Eager Loading'.
A id?ia basica atr?s disso ? o uso do atributo 'include' quando chamar um 
find ou findAll.
*/

//Assumindo o seguinte setup:
var User = sequelize.define('user',{nome:Sequelize.STRING});

    
