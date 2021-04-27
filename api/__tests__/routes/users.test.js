const supertest = require("supertest");
const { app } = require("../../../app");

describe("Users", () => {
  test("GET /users/all", async () => {
    const users = await supertest(app).get("/users/all");
    const user = users.body[0];

    expect(users.status).toBe(200);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("firstName");
    expect(user).toHaveProperty("lastName");
    expect(user).toHaveProperty("gender");
    expect(user).toHaveProperty("birthDate");
    expect(user).toHaveProperty("city");
    expect(user).toHaveProperty("profileImg");
    expect(user).toHaveProperty("subscriptionDate");
    expect(user).toHaveProperty("friendsIds");
    expect(user).toHaveProperty("photos");
    expect(user).toHaveProperty("notifications");

    expect(Array.isArray(user.friendsIds)).toBeTruthy();
    expect(Array.isArray(user.photos)).toBeTruthy();
    expect(Array.isArray(user.notifications)).toBeTruthy();
  });

  test("GET /users/0", async () => {
    const userId = 0
    const userResponse = await supertest(app).get(`/users/${userId}`);
    expect(userResponse.status).toBe(200);

    const user = userResponse.body;
    expect(user).toHaveProperty("id");
    expect(user.id).toBe(0)
    expect(user).toHaveProperty("firstName");
    expect(user).toHaveProperty("lastName");
    expect(user).toHaveProperty("gender");
    expect(user).toHaveProperty("birthDate");
    expect(user).toHaveProperty("city");
    expect(user).toHaveProperty("profileImg");
    expect(user).toHaveProperty("subscriptionDate");
    expect(user).toHaveProperty("friendsIds");
    expect(user).toHaveProperty("photos");
    expect(user).toHaveProperty("notifications");

    expect(Array.isArray(user.friendsIds)).toBeTruthy();
    expect(Array.isArray(user.photos)).toBeTruthy();
    expect(Array.isArray(user.notifications)).toBeTruthy();

  });

  test("GET /users/0/photos", async () => {
    const userId = 0
    const response = await supertest(app).get(`/users/${userId}/photos`);
    expect(response.status).toBe(200);

    const photos = response.body;
    expect(Array.isArray(photos)).toBeTruthy()

    const photo = photos[0]
    expect(photo).toHaveProperty("id");
    expect(photo.id).toBe(0)
    expect(photo).toHaveProperty("source");
    expect(photo).toHaveProperty("uploadedDate");
    expect(photo).toHaveProperty("ownerId");
  });

  test("GET /users/0/photos", async () => {
    const userId = 0
    const response = await supertest(app).get(`/users/${userId}/photos`);
    expect(response.status).toBe(200);

    const photos = response.body;
    expect(Array.isArray(photos)).toBeTruthy()

    const photo = photos[0]
    expect(photo).toHaveProperty("id");
    expect(photo.id).toBe(0)
    expect(photo).toHaveProperty("title");
    expect(photo).toHaveProperty("source");
    expect(photo).toHaveProperty("uploadedDate");
    expect(photo).toHaveProperty("ownerId");
  });
  
  test("GET /users/0/photos", async () => {
    const userId = 0
    const response = await supertest(app).get(`/users/${userId}/photos`);
    expect(response.status).toBe(200);

    const photos = response.body;
    expect(Array.isArray(photos)).toBeTruthy()

    const photo = photos[0]
    expect(photo).toHaveProperty("id");
    expect(photo.id).toBe(0)
    expect(photo).toHaveProperty("title");
    expect(photo).toHaveProperty("source");
    expect(photo).toHaveProperty("uploadedDate");
    expect(photo).toHaveProperty("ownerId");
  });
});
