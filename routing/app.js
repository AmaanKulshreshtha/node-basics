var url = require('url');
var fs = require('fs');

function renderHTML(path, response){
    response.writeHead(200, {"Content-Type":"text/html"});
    fs.readFile(path, (error, data)=>{
        if(error){
            response.writeHead(404);
            response.write("Some Error");
        }else {
            response.write(data);
        }
        response.end();
    });
}


module.exports = {
    handleRequests : (request, response)=>{
        var path = url.parse(request.url).pathname;
        switch (path) {
            case "/":
                renderHTML("./index.html", response);
                break;
            case "/routing":
                renderHTML("./routing.html", response);
                break;
            default:
                response.writeHead(404);
                response.write("File Not Found");
                response.end();
        }
    }
};