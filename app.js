const express = require("express");
const cors = require("cors");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const path = require("path");

const port = 3001;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use((req, res, next) => {
  if (req.is("text/*")) {
    req.text = "";
    req.setEncoding("utf8");
    req.on("data", function (chunk) {
      req.text += chunk;
    });
    req.on("end", next);
  } else {
    next();
  }
});
app.use(cors());
expressJSDocSwagger(app)({
  info: {
    version: "1.0.0",
    title: "Friends-backend",
    description: "Swagger of friends apis",
  },
  filesPattern: "./api/routes/*.js",
  swaggerUIPath: "/api-docs",
  baseDir: path.resolve(),
});

app.use("/users", require('./api/routes/users'));
app.use("/feed", require('./api/routes/feed'));

module.exports.app = app;
module.exports.port = port;
