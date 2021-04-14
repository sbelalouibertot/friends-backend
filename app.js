import express from "express";
import cors from "cors";
import { router as usersRouter } from "./api/routes/users.js";
import { router as feedRouter } from "./api/routes/feed.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = 3001;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Friends-backend",
      version: "1.0.0",
      description: "Swagger of friends apis",
      contact: {
        name: "Samy Belaloui-Bertot",
      },
      servers: [`https://localhost:${port}`],
    },
  },
  apis: ["./api/routes/*.js"],
};
const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);
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

app.use("/users", usersRouter);
app.use("/feed", feedRouter);

export { app, port };
