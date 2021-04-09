import express from "express";
import { loadData, writeData } from "../utils/utils.js";

const router = express.Router();

/**
 * GET http://localhost:3001/feed/all
 * -> get feed
 */
router.get("/all", (req, res, next) => {
  const posts = loadData("posts");
  const users = loadData("users");
  const feed = posts.map((post) => ({
    ...{
      userName: users.find((user) => user.id === post.userId)?.firstName,
      avatar: users.find((user) => user.id === post.userId)?.profileImg,
    },
    ...post,
  }));
  res.status(200).send(feed);
});

/**
 * POST http://localhost:3001/feed/like
 * Request body :
 * postId -> id of the post to like
 * sourceUserId -> id of the user that is reacting
 * -> add (or toggle) a like reaction to a post
 * returns the updated feed
 */
router.post("/like", (req, res, next) => {
  const posts = loadData("posts");
  const { postId, sourceUserId } = req.body;

  const ids = posts.find((post) => post.id === postId)?.reactions.likes.userIds;
  const index = ids.indexOf(sourceUserId);
  if (index === -1) ids.push(sourceUserId);
  else ids.splice(index, 1);
  posts[postId].reactions.likes.userIds = ids;
  
  writeData("posts", posts);

  const users = loadData("users");
  const feed = posts.map((post) => ({
    ...{
      userName: users.find((user) => user.id === post.userId)?.firstName,
      avatar: users.find((user) => user.id === post.userId)?.profileImg,
    },
    ...post,
  }));

  res.status(200).send(feed);
});

export { router };
