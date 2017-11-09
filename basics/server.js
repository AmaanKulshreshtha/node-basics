var http = require('http');
var module1 = require('./module1');
var module2 = require('./module2');


function onStart(request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World \n");
    response.write(module1.myName+"\n");
    response.write(module2.feeling);
    module1.startFunction();
    module2.askingFunction();
    response.end();
}

http.createServer(onStart).listen(8000);
