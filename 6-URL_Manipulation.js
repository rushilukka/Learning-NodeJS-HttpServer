
//      6-URL_Manipulation


const url = require("url");
const http = require("http");

const fun = () =>{
   
    const myServer = http.createServer((req, res) => {
    
    const MyUrl = url.parse(req.url,true);
     switch (MyUrl.pathname) {
        // http://localhost:5000/?name=Rushi&y=3
        case "/": 
            console.log(MyUrl +"\nQuery : "+MyUrl.query.name+"\nPath : "+MyUrl.path);
            res.end(`URL segregated Done ${MyUrl.query.name}`)
            break;
        // http://localhost:5000/about    
        case "/about":
                res.end(`ABOUT`)
		        break;
        default:
            res. end ("404 Not Found");
        }
    });
    myServer. listen(5000, () => console.log("Server Started!"));

}
module.exports={
fun
} 
 
