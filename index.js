const http = require("http");
const fs = require("fs");
// req 2 times executed as browser loads 2 things: fav icon & the req
//so 2 times append So use:_----
const myServer = http.createServer((reqzzzz, respppp) => {
        if (reqzzzz.url === "/favicon.ico") return respppp.end();
        const log = `${Date().toString()}: New Req Received from 
        ${reqzzzz.connection.remoteAddress}\n fromPath: ${reqzzzz.url}\n` ;
        //Never use ***Date.now() : return ms since Jan 1 ,1970
        //****req.ip when use express() 
        //create log file
        console.log(log);
        fs.appendFile("log.txt", log, (err, data) => {
            switch (reqzzzz.url) {
                case "/":
                respppp.end("HomePage") ;
                break;
                case "/about":
                    respppp.end("I am Piyush Garg");
                break;
                default:
                respppp. end ("404 Not Found");
            }
        //respppp. end("Hello From Server Again");
        
        //Vmp *****req object****** all details
        // console. log(reqzzzz.headers);
        // console. log(reqzzzz);

        //ONLY 1 end**************************************
       // respppp. end ("req.toStr");
        });
    });

    myServer. listen(8000, () => console.log("Server Started!"));
