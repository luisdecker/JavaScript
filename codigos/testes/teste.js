/**
 * Created by decker on 02/03/17.
 */
var print = function print() {
    for (x in arguments){
        console.log(arguments[x]);
    }
};

var printObj = function (obj) {
    for (var att in obj){
        var mensagem = "[" + att.toString()+"] " + obj[att];
        console.log(mensagem);
    }
};

var pess = {
    idade: 20,
    nome: "Joao",
    print: function print () {
        console.log("Sou ".concat(this.nome).concat(" e tenho ").concat(this.idade).concat(" anos!"));

    },
    trabalhar: function (instrucoesTrabalho) {
        instrucoesTrabalho(this);
    }
};



pess.print();
var instrucoesProgramador = function (pessoa) {
    console.log(pessoa.nome + " esta programando!");
};
pess.trabalhar(instrucoesProgramador);
/**============================= */
var printaArgumentos = function () {

    for (a in arguments){
        console.log(arguments[a]);
    }
    console.log("-----------");
    console.log(arguments);
};
console.log("\nVazio");
printaArgumentos();
console.log("\nArgumentos");
printaArgumentos("Primeiro" , 2 , "terceiro");
console.log("\nVetord");
printaArgumentos(["um", "Vetor", "de" ,"argumentos"]);
/*==============================*/
console.log ("================");
var criaPessoa = function (nome, idade) {
    var p = {nome:nome, idade: idade};
    var obterNome = function () {
        return p.nome;
    };
    var obterIdade = function () {
        return p.idade;
    };
    var fazerAniversario = function () {
        return ++p.idade;
    };

    return {
        obterNome: obterNome,
        obterIdade: obterIdade,
        fazerAniversario: fazerAniversario
    }
};

var pessoa1 = criaPessoa("Joao",0);
console.log(pessoa1.obterNome());
pessoa1.fazerAniversario();
console.log(pessoa1.obterIdade());
pessoa1.idade = 10;
console.log(pessoa1.obterIdade());
//===============================
console.log("===========");
var criaAluno = (function () {
    var nome = "Maria";
    var nota = "10";
    return{
        getNota: function () {
            return nota;
        },
        getNome: function () {
            return nome;
        }
    }
})();

console.log(criaAluno.getNome());
console.log(criaAluno.getNota());
//================================
//Regex
console.log("===========");
var regex2n2l = /^[0-9]{0,2}[a-zA-Z]{2}$/;
var texto1 = "22gj";
var texto2 = "111d";
var texto3 = "7ll";
var texto4 = "1267890976543AA";


console.log(regex2n2l.test(texto1));
console.log(regex2n2l.test(texto2));
console.log(regex2n2l.test(texto3));
console.log(regex2n2l.test(texto4));

var rodape ='Telefones Para Contato: Comercial: "(48) 3325-2511" Celular: "9931-4412" Casa: "(48)3312-4124"';
console.log(rodape);

var regexTelefone = /((\([0-9]{2}\))? ?([0-9]{4,5}-?[0-9]{4}))/g;
console.log(regexTelefone.test(rodape));

var telefonesEncontrados = rodape.match(regexTelefone);
console.log("Telefones Encontrados:\n" + telefonesEncontrados);
//================================
console.log("===========");
//Datas
var hoje = new Date(
    Date.parse("1/12/2012")
);

var tipoData1 = new Date(2015, 11, 25);
var tipoData2 = new Date("2015-12-25T10:00:00");


console.log(hoje);

//================================
//Comparacaoes
console.log("===========");

//Entre dois objetos
/*
A comparação de objetos em js é comparacao de referencia.
* */
var x = {a:1};
var y = {a:1};
var z = x;

console.log(x == y);//false
console.log(x == z);//true
//Operadores lógicos
//Realizam curto circuito, ou seja, se o primeiro de um || é true, nem vê o segundo. Logo,
//if (true||func(x)) nem chega a executar func(x).

var funcaozinha = function () {
    console.log("Funcãozinha!");
    return true;
};

var x = true || funcaozinha();
print ("primeiro x printado!");
var x = funcaozinha() || funcaozinha();
print ("Segundo x printado!");

//Quando comparamos variáveis, o 'retorno' da comparação é o caso que fez dar "true"
var comp1 = 0|| "batatinha";
print (comp1);
var comp2 =  1 || "batatinha";
print (comp2);
//Aproveitando a propiedade de curto-circuito
var geraAleatorio = function (maximo) {
    var maximo = maximo || 1000;
    return Math.ceil(Math.random()*maximo);
};
console.log("Número aleatório: " + geraAleatorio());
console.log("Número aleatório: " + geraAleatorio(10));

//typeof -> verifica o tipo de uma variavel
var numero = 123;
typeof  numero; //Number

//instanceof x -> Verifica se um objeto tem a função constutora em sua cadeia de portótipos
var Pessoa = function(nome, idade){//<<< Função construtora
    this.idade = idade;
    this.nome = nome;
};

var pedro = new Pessoa("Pedro", 10);
pedro instanceof Pessoa; //True;

//in -> Verifica se uma objeto tem uma dada propiedade

//nome in pedro; //true
//batata in pedro //false

//Tratamento de erros
/*
* Podemos usar o "throw" para lançar uma excessão em js. Lançamos uma excessão com
* qualquer tipo, pode ser inteiro, string, objeto...
* E usamos catch para pegar as excessões
*
* */
var MyError = function (mensagem, tipo) {
    var _tipo = tipo || "Erro genérico";
    var _mensagem = mensagem|| "";

    var getMensagem = function () {return _mensagem;};
    var getTipo = function() { return _tipo;};

    this.mensagem = getMensagem();
    this.tipo = getTipo();

};

var funcaoQueBuga = function (mensagem) {
    if (!(typeof mensagem == typeof "")) throw new MyError("Mensagem não é string", "TypeError");
};


try{
funcaoQueBuga(4);

}catch (e) {

    if (e instanceof MyError){
        console.log("[" + e.tipo + "]" + e.mensagem);
    }
}

//Herança
console.log("========Testes com herança======");
//No js, objetos herdam de objetos (ao invés de classes herdarem de classes, como é comum nas linguagens arcanas.

//Aqui defino a funcao construtora de uma pessoa. Ela retorna uma pessoa, que pode depois ser usada como protótipo
//em outro objeto.
//(Lembrando que:
// -> Ou se cria uma "pessoa base" que será prototype de todos os filhos de pessoas
// -> Ou se cria uma pessoa nova pra cada novo filho de pessoa.
//Esta decisão deriva de um estudo do domínio do problema a ser resolvido.

var Pessoa = function (nome,idade) {
    var self = {
        nome:nome,
        idade:idade
    };
    this.nome = function () {
        return self.nome;
    };
    this.idade = function () {
        return self.idade;
    };
    this.toString = function () {
        return ""+ self.nome + " tem " + self.idade + " anos.";
    }
};
var pesTeste = new Pessoa("aa", 123);
console.log (pesTeste.toString());

var Aluno = (function () {
    var criaAluno = function Aluno(nome, idade, matricula) {
        self = {
            nome:nome,
            idade:idade,
            matricula:matricula
        };
        this.getMatricula = function () {
            return self.matricula;
        }

    };//cria aluno
    criaAluno.prototype = new Pessoa();
    return criaAluno;
})();

var aluno1 = new Aluno("Zeca",12,22313);


//Modulos
//Modulos são arquivos js carregados dentro do seu projeto
//Quando se importa um módulo, estamos pegando o objeto module.exports daquele arquivo executado
//Modulos ficam em cache, logo, só são importados uma vez.

//Importando o modulo numbers do diretório meus_modulos

var soma = require("./meus_modulos/numbers").soma; // Note que não é necessário inserir o .js
console.log("Somando 1 e 3 = " + soma (1,3));


