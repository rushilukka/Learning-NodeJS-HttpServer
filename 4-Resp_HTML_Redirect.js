const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const fun = () =>{

const server = http.createServer((req, res) => {
    // Handle requests for the home page
    if (req.url === '/' || req.url === '/index.html') {
        serveFile(res, '4-RenderFiles/index.html', 'text/html');
    }
    // Handle requests for the about page
    else if (req.url === '/about') {
        serveFile(res, '4-RenderFiles/about.html', 'text/html');
    }
    // Handle requests for the CSS file
    else if (req.url === '/styles.css') {
        serveFile(res, '4-RenderFiles/styles.css', 'text/css');
    }
    // Redirect any other requests to the home page
    else {
        res.writeHead(302, { 'Location': '/' });
        res.end();
    }
});

// Function to serve files
function serveFile(res, filePath, contentType) {
    const absPath = path.join(__dirname, filePath);
    fs.readFile(absPath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


}
module.exports ={
    fun
}