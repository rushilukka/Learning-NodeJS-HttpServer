const http = require('http');
const url = require('url');
const cookie = require('cookie');


const fun = () =>{
// In-memory session store (for simplicity)
const sessions = {};

const server = http.createServer((req, res) => {
  // Parse cookies
  const cookies = cookie.parse(req.headers.cookie || '');
    console.log(cookies)
  // Generate or retrieve session ID
  const sessionId = cookies.sessionId || generateRandomId();
  console.log(sessionId)
  // Get session data
  const session = sessions[sessionId] || {};
  console.log(session)

  // Handle request based on session data
  // ...

  // Set session data
  sessions[sessionId] = session;

  // Set cookie
  res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly`);

  // Send response
  res.end('Hello, World!'+sessionId);
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});

function generateRandomId() {
  // Implement a secure random ID generation
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

}
module.exports ={
    fun
}