const express = require("express");
const { loadData, writeData } = require("../utils/utils.js");

const router = express.Router();

/**
 * GET /users/all
 * @tags users
 * @summary Get all users
 * @return {object} 200 - Success response
 */
router.get("/all", (req, res, next) => {
  const users = loadData("users");
  res.status(200).send(users);
});

/**
 * GET /users/{id}
 * @tags users
 * @summary Get user with id = x
 * @param {number} id.path.required User ID (e.g : 1)
 * @return {object} 200 - Success response
 */
router.get("/:id", (req, res, next) => {
  const users = loadData("users");
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  res.status(200).send(user);
});

/**
 * GET /users/{id}/photos
 * @tags users
 * @summary Get photos of user with id = x
 * @param {number} id.path.required User ID (e.g : 1)
 * @return {object} 200 - Success response
 */
router.get("/:id/photos", (req, res, next) => {
  const photos = loadData("photos");
  const userId = parseInt(req.params.id);
  const userPhotos = photos.filter((photo) => photo.ownerId === userId);
  res.status(200).send(userPhotos);
});

/**
 * GET /users/{id}/messages
 * @tags users
 * @summary Get messages of user with id = x
 * @param {number} id.path.required User ID (e.g : 1)
 * @return {object} 200 - Success response
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
 * GET /users/{id}/messages/incoming
 * @tags users
 * @summary Get incoming messages of user with id = x
 * @param {number} id.path.required User ID (e.g : 1)
 * @return {object} 200 - Success response
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
 * GET /users/{id}/messages/sent
 * @tags users
 * @summary Get sent messages of user with id = x
 * @param {number} id.path.required User ID (e.g : 1)
 * @return {object} 200 - Success response
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
 * GET /users/{id}/notifications
 * @tags users
 * @summary Get new notifications of user with id = x, then remove the notification item.
 * @param {number} id.path.required User ID (e.g : 1)
 * @return {object} 200 - Success response
 */
router.get("/:id/notifications", (req, res, next) => {
  const notifications = loadData("notifications");
  const users = loadData("users");
  const posts = loadData("posts");

  const userId = parseInt(req.params.id);
  const userNotifications = notifications.filter(
    (notification) => notification.userId === userId
  );
  writeData(
    "notifications",
    notifications.filter((notification) => notification.userId !== userId)
  );

  res.status(200).send(
    userNotifications.map((notification) => ({
      ...notification,
      userFirstName: users.find((user) => user.id === notification.senderId)
        .firstName,
      activity: posts.find((post) => post.id === notification.postId).activity,
    }))
  );
});

module.exports = router;
