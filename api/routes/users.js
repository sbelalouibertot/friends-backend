import express from "express";
import { loadData, writeData } from "../utils/utils.js";

const router = express.Router();

/**
 * GET http://localhost:3001/users/all
 * -> get all users
 */
router.get("/all", (req, res, next) => {
  const users = loadData("users");
  res.status(200).send(users);
});

/**
 * GET http://localhost:3001/users/1
 * -> get user with id = 1
 */
router.get("/:id", (req, res, next) => {
  const users = loadData("users");
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  res.status(200).send(user);
});

/**
 * GET http://localhost:3001/users/1/photos
 * -> get photos of user with id = 1
 */
router.get("/:id/photos", (req, res, next) => {
  const photos = loadData("photos");
  const userId = parseInt(req.params.id);
  const userPhotos = photos.filter((photo) => photo.ownerId === userId);
  res.status(200).send(userPhotos);
});

/**
 * GET http://localhost:3001/users/1/messages
 * -> get messages of user with id = 1
 */
router.get("/:id/messages", (req, res, next) => {
  const messages = loadData("messages");
  const userId = parseInt(req.params.id);
  const userMessages = messages.filter(
    (message) =>
      message.sourceUserId === userId || message.destinationUserId === userId
  );
  res.status(200).send(userMessages);
});

/**
 * GET http://localhost:3001/users/1/messages/incoming
 * -> get incoming messages of user with id = 1
 */
router.get("/:id/messages/incoming", (req, res, next) => {
  const messages = loadData("messages");
  const userId = parseInt(req.params.id);
  const userMessages = messages.filter(
    (message) => message.destinationUserId === userId
  );
  res.status(200).send(userMessages);
});

/**
 * GET http://localhost:3001/users/1/messages/sent
 * -> get sent messages of user with id = 1
 */
router.get("/:id/messages/sent", (req, res, next) => {
  const messages = loadData("messages");
  const userId = parseInt(req.params.id);
  const userMessages = messages.filter(
    (message) => message.sourceUserId === userId
  );
  res.status(200).send(userMessages);
});

/**
 * GET http://localhost:3001/users/1/notifications
 * -> get new notifications of user with id = 1, then remove the notification item.
 */
router.get("/:id/notifications", (req, res, next) => {
  const notifications = loadData("notifications");
  const userId = parseInt(req.params.id);
  const userNotifications = notifications.filter(
    (notification) => notification.userId === userId
  );
  writeData(
    "notifications",
    notifications.filter((notification) => notification.userId !== userId)
  );
  res.status(200).send(userNotifications);
});

export { router };
