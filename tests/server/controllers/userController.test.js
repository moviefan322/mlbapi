const request = require("supertest");
const { app } = require("../../../server/server.js");
const User = require("../../../server/models/userModel.js");
const mongoose = require("mongoose");
const db = require("../../../server/config/db.js");

describe("registerUser", () => {
  beforeAll(async () => {
    // connect to database before running any tests
    db();
  }, 30000);
  afterAll(async () => {
    // close database connection after all tests complete
    await mongoose.connection.close();
  }, 30000);
  beforeEach(async () => {
    await User.deleteMany();
  }, 30000);

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "Ass McButthole",
        email: "butthole@poop.biz",
        password: "password",
      })
      .expect(201);

    // assert response
    expect(res.body.name).toBe("Ass McButthole");
    expect(res.body.email).toBe("butthole@poop.biz");
    expect(res.body.token).toBeDefined();

    // assert database
    const user = await User.findOne({ email: "butthole@poop.biz" });
    expect(user).toBeDefined();
    expect(user.name).toBe("Ass McButthole");
    expect(user.accountBalance).toBe(100);
    expect(user.isAdmin).toBe(false);
  }, 10000);

  it("should return an error if user already exists", async () => {
    // create a user with same email
    await User.create({
      name: "Jane Doe",
      email: "janedoe@example.com",
      password: "password",
      isAdmin: false,
      accountBalance: 100,
    });

    // attempt to register with same email
    const res = await request(app)
      .post("/users")
      .send({
        name: "John Doe",
        email: "janedoe@example.com",
        password: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.error).toBe("User already exists");
  });

  it("should return an error if required fields are missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "John Doe",
        password: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.error).toBe("Please fill out all fields");
  });
});
