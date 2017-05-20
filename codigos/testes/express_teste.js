'use strict'
const express = require('express');
const app = express();

var bold = (message) => {
    return "<b>" + message + "</b>";
}

const NEWLINE = '<br>'


app.get('/',(req,res)=>{
    res.send("Olá, Plape!" + NEWLINE + bold("VAI PLAPE!") );
});

app.listen(8080);
