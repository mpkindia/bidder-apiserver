const config = require('./config');
const app = require('./src/app');

const http = require('http');
const port = (config.port);
console.log(`Server running on port: ${port}`);
const server = http.createServer(app);

server.listen(port);