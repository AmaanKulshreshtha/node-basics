Node js helps us to make our own server.

-- It will allow us to decide our own port number and the way we handle any requests.

So we run the server.js file and it runs once and then ends, so we need to ensure that it runs in a loop.

---------- IMPORTANT MODULES --------------

# http module: it helps us to create the server.
    ^ now in this module we have the createServer() method which creates the server for us.
    ^^ we chain another method with this createServer() method and that is the listen() method 

            <http module>.createServer().listen(8000)

    now the number inside this listen() method is our port number.

    ^^^ we have to pass in a function inside createServer method which will run once the createServer() method executes.
        + the function inside the createServer() method takes in two arguments, because when the createServer() method runs, it generates these two arguments which then get passed into that function.
        ++ these two arguments are request and response.

    ^^^^ say we created a function called 'X'. Now this X will take in the arguments request and response from the server

            function X(request,response){
                // write code here...
            }
            
            <http module>.createServer(X).listen(8000) 

        +++ EXPLORING SOME RESPONSE METHODS
           ---------------------------------

           => response.writeHead(status:int, {key:value}:js object)
           => response.write(// To render something on the page: Visual)
           => response.end() -> This tells that the server has given the response to the request and now it can outputted to the user.

## MODULES
------------

In essence they are chunks of code that can be executed.

  #  Say we made a module called module1.js
  #  Now in this module1.js file we will put some code

        function myFunction(){
            console.log("FUNCTION STARTED!, and says Hi!!");
        }

        var myName = "Amaan"

  #  As it can be seen, we made a function that would console the text and a variable.
  #  The issue here is, this file can't be used unless there is an instruction that tells it to be used in other files too.
  #  In other words, we need to tell it to export itself so that becomes available throughout the project.
    
    How to do that????.....Here's how


        function myFunction(){
            console.log("FUNCTION STARTED!, and says Hi!!");
        }

        var myName = "Amaan"

        module.exports.<custom-name> = myFunction //note: do not put parameters when defining which function you want to use.
        module.exports.<custom-name2> = myName


        A convention used is that the <custom-name> and the element you like to export have the same name, but like whateves... =P
  
  #  Now to import(bring in) this function into other files so that it can be used.

    => var <var-name>= require('path-to-file'); // don't mention the extension. The setup is smart enough to understand that =P.

    usage depends on what you want to use:

    => If it's a function that you want to use:
        -> <var-name>.<custom-name>(); // for function
    => If it's a variable you want to print:
        -> response.write(<var-name>.<custom-name2>);

  #  Another way to import modules is written below

    
            module.exports = {
                askingFunction : () => {
                    console.log("Hey There! How are You?")
                },
                feeling: "How are you feeling now that you know Modules?"
            }

       ** Repeat the procedure in how to import for this as well
 

### RENDERING AN HTML FILE
-----------------------------

    => In order to render a file, let's understand some working structure first
        
        -> The user is requesting for an html file to look at.
        -> The problem is, that the file should be present on the server for it to be sent as a response.
        -> Now if we make the file in the directory, doesn't mean that it gets included the server
        -> We need a module called fs(short for file-system) to fetch that html file
        -> See the following code.


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

        As seen above in the code, we start with the usual creating a server and passing in a function to that method.
        The real fun begins inside this function.

        => So we first use the method readFile() to fetch the html file we want to view. 
        => In addition to this, it also has another in-built argument for a callback function, as to what would happen after it has fetched the html file.
        => It is an optional argument.

        => Now coming to the callback function: 
            -> It has 2 arguments of its own
            -> First is error and the second is data
            -> error: If the file couldn't be fetched, then that error is stored in this argument.
            -> data: If the file has been fetched correctly, then the data it has is stored in this argument.
            -> After this we check if the file has been fetched correctly or not.
                    -- If not, then change the status of the header to 404 and display that file wasn't found
                    -- If yes, then write the data of the file fetched.
                    -- Now instead of having the response.end() outside the callback function would cause a problem.
                        == If response.end() is outside the callback function then it would execute before the file is even fetched because if it is inside the callback function.
                        == This happens because all the code gets executed simultaneously, so when the file is fetched, response.end() doesn't realise that the file has been fetched, and so it gives nothing.
        
#### ROUTING
--------------

    => We just need to specify which, on which path, what rendering will take place.
    => Code for example

    //-------SERVER3.JS--------//

    var http = require('http');
    var app = require('./app');


    http.createServer(app.handleRequests).listen(8040);

    -----------------------------------------------------------------------------------------------------------------

    EXPLANATION: 1.) Mentioned above, we are importing modules.
                 2.) handleRequests is the function we want to use from app.js(which is being imported as the module here)

    -----------------------------------------------------------------------------------------------------------------


    //--------APP.JS----------//

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

    -------------------------------------------------------------------------------------------------------------------

    EXPLANATION: 
                 1.) So first we take in the function(s) we want to export. In this case we want to export handleRequests as the function of the app module.
                 2.) Next we retrive the path from url.parse().pathname.
                 3.) The argument in the parse method is of the url that can be taken from the request.
                 4.) We are taking the url from the request and then passing that url as the argument to get the String value of that url.
                 5.) Next we want to check as to which url has been requested and based on that we will decide what we want to display or return to the user.
                 6.) We are using a switch case for that.
                 7.) We pass in a function renderHTML() that has been created above.
                        i.) The renderHTML function has two parameters path and response.
                        ii.) The renderHTML function performs the same drill as mentioned in the fs(file-system) section.
                        iii.) Now instead of the ./index.html we will write path that was passed as an argument.
                 8.) The reason we are writing response.end() in default in the switch statement, is that it doesn't call the renderHTML() function, and so it doesn't have the response.end() statement in the first place. He we write it again.

-------------------------------------------------------------------------------------------------------------------------
