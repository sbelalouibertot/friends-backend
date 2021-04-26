const supertest = require("supertest");
const { app } = require("../../../app");

test("GET /", async () => {
  const users = await supertest(app).get("/users/all");
  console.log("users.body = ", users.body);
});
