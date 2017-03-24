/**
 * Created by decker on 22/03/17.
 */
/*
 * Este exemplo usa o framework express para criar um servidor "hello world".
 * O express e um dos framwors mais usados para este ramo de aplicacao*/

var express = require('express');
var app = express();
var port = 3000;

function cbGet(request,response){
    response.send("Olar!");
}

function cbErr(err){
    if(err){
        console.log(err);
    }
    console.log("Server rodando mais que o piao da casa propia!");
}

app.get ('/', cbGet);

app.listen(port,cbErr);