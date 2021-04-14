import http from "http";
import {app, port} from "./app.js";

const server = http.createServer(app);
server.listen(port);
