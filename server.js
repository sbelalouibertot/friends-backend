import http from "http";
import app from "./app.js";

const port = 3001;

const server = http.createServer(app);
server.listen(port);
