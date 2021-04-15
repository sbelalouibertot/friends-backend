import express from "express";
import { loadData, writeData } from "../utils/utils.js";

const router = express.Router();

/**
 * GET /feed/all
 * @tags feed
 * @summary Use to get all feed
 * @return {object} 200 - Success response
 */
router.get("/all", (req, res, next) => {
  const posts = loadData("posts");
  const users = loadData("users");
  const feed = posts
    .map((post) => ({
      ...{
        userName: users.find((user) => user.id === post.userId)?.firstName,
        avatar: users.find((user) => user.id === post.userId)?.profileImg,
      },
      ...post,
    }))
    .sort((a, b) => b.id - a.id);
  res.status(200).send(feed);
});

/**
 * Like object
 * @typedef {object} LikeObject
 * @property {number} postId.required - id of the post to like
 * @property {number} sourceUserId.required - id of the user that is reacting
 */
/**
 * POST /feed/like
 * @summary add (or toggle) a like reaction to a post. update user notifications and returns the updated feed
 * @tags feed
 * @param {LikeObject} request.body.required - like info - application/json
 * @return {object} 200 - Success response (the updated feed)
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
  const feed = posts
    .map((post) => ({
      ...{
        userName: users.find((user) => user.id === post.userId)?.firstName,
        avatar: users.find((user) => user.id === post.userId)?.profileImg,
      },
      ...post,
    }))
    .sort((a, b) => b.id - a.id);

  const notifications = loadData("notifications");
  notifications.push({
    id: notifications.length,
    userId: posts.find((post) => post.id === postId)?.userId,
    postId: postId,
    senderId: sourceUserId,
    date: new Date(),
    type: "LIKE",
    postId: postId,
  });
  writeData("notifications", notifications);

  res.status(200).send(feed);
});

/**
 * New post info
 * @typedef {object} FeedAddObject
 * @property {string} activity.required - activity key (e.g "RESTAURANT")
 * @property {number} sourceUserId.required - id of the user that is adding a new post
 */
/**
 * POST /feed/add
 * @summary add a new post to the feed and returns the updated feed
 * @tags feed
 * @param {FeedAddObject} request.body.required - new post info info - application/json
 * @return {object} 200 - Success response (the updated feed)
 */
router.post("/add", (req, res, next) => {
  const posts = loadData("posts");
  const { activity, sourceUserId } = req.body;

  const newPost = {
    id: posts.length,
    userId: sourceUserId,
    date: new Date(),
    activity,
    reactions: {
      likes: {
        userIds: [],
      },
    },
  };

  posts.push(newPost);
  writeData("posts", posts);

  const users = loadData("users");
  const feed = posts
    .map((post) => ({
      ...{
        userName: users.find((user) => user.id === post.userId)?.firstName,
        avatar: users.find((user) => user.id === post.userId)?.profileImg,
      },
      ...post,
    }))
    .sort((a, b) => b.id - a.id);

  res.status(200).send(feed);
});

export { router };
