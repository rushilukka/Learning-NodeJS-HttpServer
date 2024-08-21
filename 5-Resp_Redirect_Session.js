//      5-Resp_Redirect_Session

// *********USE With Express() ONLY*********


const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // For generating unique session IDs
const querystring = require('querystring'); // For parsing query parameters

const PORT = process.env.PORT || 3000;

const fun = () => {
    const sessions = {};

    const server = http.createServer((req, res) => {
        let username = "guest"; // Default username
        if (req.url.includes('?')) {
            const query = req.url.split('?')[1];
            const params = querystring.parse(query);
            username = params.username || "guest";
        }
        
        // Create or retrieve the session ID
        const sessionId = createSession(username);

        // Serve the appropriate page
        if (req.url.startsWith('/index.html') || req.url === '/') {
            serveFile(res, '5-RenderFiles/index.html', 'text/html', sessionId);
        } else if (req.url.startsWith('/about')) {
            serveFile(res, '5-RenderFiles/about.html', 'text/html', sessionId);
        } else if (req.url.startsWith('/styles.css')) {
            serveFile(res, '5-RenderFiles/styles.css', 'text/css');
        } else {
            res.writeHead(302, { 'Location': '/' });
            res.end();
        }
    });

    // Function to create a session ID
    function createSession(username) {
        const timestamp = Date.now().toString();
        const sessionId = crypto.createHash('sha256').update(username + timestamp).digest('hex');
        sessions[sessionId] = { username, timestamp };
        return sessionId;
    }

    // Function to serve files and inject session ID
    function serveFile(res, filePath, contentType, sessionId = null) {
        const absPath = path.join(__dirname, filePath);
        fs.readFile(absPath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            } 
            else {
                if (sessionId && contentType === 'text/html') {
                    const sessionInfo = sessions[sessionId];
                    content = content.replace('{{SESSION_ID}}', sessionId);
                    content = content.replace('{{USERNAME}}', sessionInfo.username);
                    content = content.replace('{{TIMESTAMP}}', new Date(parseInt(sessionInfo.timestamp)).toLocaleString());
                }
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
   server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = {
    fun
}
