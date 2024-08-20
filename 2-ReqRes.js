const http = require("http");
const fs = require("fs");

const fun = () =>{
    const myServer = http.createServer((req, res ) => {
        console.log(req.url); // Prints the requested URL path
        console.log(req.method); // Prints the HTTP method (GET, POST, etc.)
        console.log(req.headers); // Prints the request headers
      
        // Response object example
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello, World!\n');
        res.end(); 
     
    });
    myServer. listen(5000, () => console.log("Server Started!"));


}
module.exports ={
    fun
}