/**
 * Created by decker on 21/03/17.
 */

//Hello world server
    //Isto e considerado uma abordagem "Low level". Para aplicaçoes reais,se utilizam frameworks
    //como <express>
var http = require('http');
http.createServer(
    function (req,res) {
        res.writeHead(200,
            {
                'Content-Type': 'text/plain'
            }
        );
        res.end("Olar");
    }
).listen(3000);

