/**
 * Created by decker on 23/03/17.
 */
//Exemplo em que o servidor envia um html criado com o pacote 'handlebar' (para templates semanticas)

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
app = express();

//Inicia a enginde do handlebars e troca o diretorio de layouts para views/layouts.
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
//A ultima coisa que temos que fazer e adicionar um gerente de rotas
app.get('/', function (request,response) {
    /*O metodo render recebe dois parametros
     * o primeiro e o nome da view, e o segundo e o dado que queremos renderizar*/
    response.render('home',{
        name:'decker'
    })
});

console.log('Servidor iniciado');
app.listen(3000);