const supertest = require("supertest");
const { app } = require("../../../app");

test("GET /feed/all", async () => {
  const feed = await supertest(app).get("/feed/all");
  const feedItem = feed.body[0];

  expect(feed.status).toBe(200);
  expect(feedItem).toHaveProperty("id");
  expect(feedItem).toHaveProperty("userName");
  expect(feedItem).toHaveProperty("userId");
  expect(feedItem).toHaveProperty("avatar");
  expect(feedItem).toHaveProperty("date");
  expect(feedItem).toHaveProperty("activity");
  expect(feedItem).toHaveProperty("reactions");

  expect(feedItem.reactions).toHaveProperty("likes");
  expect(feedItem.reactions.likes).toHaveProperty("userIds");

  expect(Array.isArray(feedItem.reactions.likes.userIds)).toBeTruthy()
});
