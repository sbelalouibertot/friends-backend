const supertest = require("supertest");
const { app } = require("../../../app");

test("GET /", async () => {
  const feed = await supertest(app).get("/feed/all");
  console.log("feed.body = ", feed.body);
});