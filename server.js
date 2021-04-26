const http = require("http");
const { app, port } = require("./app.js");

const server = http.createServer(app);
server.listen(port);
