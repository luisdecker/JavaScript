//Meu primeiro script
//Funcoes globais
var printaAtributos = function (objeto) {
    for (var att in objeto){
        console.log(att + " -> " + objeto[att]);
    }
};
//----------------------
var printou = function () {
    var parConsole = document.getElementById('console');
    var textoAtual = parConsole.innerHTML;
    textoAtual += "Click!<br>";
    parConsole.innerHTML=textoAtual;
};
//----------------------
var resetConsole = function(){
    var parConsole = document.getElementById('console');
    parConsole.innerHTML="<BR>";
};
//----------------------
var trocarTema = function () {

    var parConsole = document.getElementById('console');
    if(parConsole.getAttribute('class') == "consoleStyle1"){
        parConsole.setAttribute('class','consoleStyle2');
    }else{
        parConsole.setAttribute('class','consoleStyle1');
    }
};


//-----------------------------------------------


document.write("Primeira linha de texto inserida!<BR>");
document.write("<b>Esta linha está em negrito</b>");
resetConsole();
var titulo = document.getElementById("titulo");
console.log("Elemento título:");
printaAtributos(titulo);
console.log(titulo+"");
titulo.setAttribute('onclick','printou()');





