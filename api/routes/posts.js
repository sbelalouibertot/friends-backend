import express from "express";
import { loadData } from "../utils/utils.js";

const router = express.Router();

/**
 * GET http://localhost:3001/posts/all
 * -> get all posts of platform, limited to 100 results
 */
router.get("/all", (req, res, next) => {
  const posts = loadData("posts");
  res.status(200).send(posts);
});

export { router };
