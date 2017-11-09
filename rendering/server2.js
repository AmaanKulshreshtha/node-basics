var http = require('http');
var fs = require('fs');

function startFunction(request, response){
    response.writeHead(200, {"Content-type":"text/html"});
    fs.readFile('./index.html', (error, data)=>{
        if(error){
            response.writeHead(404);
            response.write("File Not Found");          
        }else {
            response.write(data);
        }
        response.end();
    });
}


http.createServer(startFunction).listen(8080);