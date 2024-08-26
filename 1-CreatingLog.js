//      1-CreatingLog

const http = require("http");
const fs = require("fs");

const fun = () =>{
    const myServer = http.createServer((reqzzzz, respppp) => {
        
        
        //------------Concept -- 1 req by brpwser :So Must Remove 
        // req 2 times executed as browser loads 2 things: fav icon & the req
        //------------------------------------------------------------
        if (reqzzzz.url === "/favicon.ico") return respppp.end();
        //so 2 times append So use:_----

        //-----------------------------------------------
        const log = `
        -----------------------------------------------
        ${Date().toString()}:\n 
        New Req Received from ----> ${reqzzzz.connection.remoteAddress}\n 
        fromPath: ${reqzzzz.url}\n` ;
        //Never use ***Date.now() : return ms since Jan 1 ,1970
       
       
         //create log file
        //console.log(log);
        fs.appendFile("log.txt", log, (err, data) => {
            switch (reqzzzz.url) {
                case "/":
                        //ONLY 1 end**************************************
                        respppp.end("HomePage") ;
                        break;
                 default:
                        //ONLY 1 end**************************************
                        respppp. end ("404 Not Found");
            }
        });
    
    
    });
    myServer. listen(5000, () => console.log("Server Started!"));
}
module.exports ={
    fun
}