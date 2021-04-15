import express from "express";
import cors from "cors";
import { router as usersRouter } from "./api/routes/users.js";
import { router as feedRouter } from "./api/routes/feed.js";
import expressJSDocSwagger from "express-jsdoc-swagger";
import path from "path";

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

app.use("/users", usersRouter);
app.use("/feed", feedRouter);

export { app, port };
