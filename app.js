import express from "express";
import cors from 'cors';
import {router as usersRouter} from './api/routes/users.js'
import {router as postsRouter} from './api/routes/posts.js'

const app = express();

app.use(express.json({limit: '50mb' }));
app.use(express.urlencoded({ extended: true}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    
    next();
  });
app.use(cors())
app.use((req, res, next) => {
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

export default app