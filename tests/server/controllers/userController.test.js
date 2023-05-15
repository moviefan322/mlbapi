const request = require("supertest");
const server = require("../testserver.js");
const User = require("../../../server/models/userModel.js");
const mongoose = require("mongoose");
const db = require("../../../server/config/db.js");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

beforeAll(async () => {
  // connect to database before running any tests
  db();
}, 30000);
afterAll(async () => {
  // close database connection after all tests complete
  await mongoose.connection.close();
  server.close();
}, 30000);

describe("registerUser", () => {
  afterEach(async () => {
    await User.deleteMany();
  }, 30000);

  it("should register a new user", async () => {
    const res = await request(server)
      .post("/api/users")
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
  });

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
    const res = await request(server)
      .post("/api/users")
      .send({
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.message).toBe("User already exists");
  });

  it("should return an error if required fields are missing (email)", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({
        name: "John Doe",
        password: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.message).toBe("Please fill out all fields");
  });

  it("should return an error if required fields are missing (name)", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({
        email: "John@Doe.com",
        password: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.message).toBe("Please fill out all fields");
  });

  it("should return an error if required fields are missing (password)", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({
        email: "John@Doe.com",
        name: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.message).toBe("Please fill out all fields");
  });

  it("should hash the password", async () => {
    const password = "password";
    const res = await request(server)
      .post("/api/users")
      .send({
        name: "John Doe",
        email: "John@john.com",
        password: password,
      })
      .expect(201);

    expect(res.body.password).not.toBe(password);
  });

  it("should reject an invalid emal", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({
        name: "Ass McButthole",
        email: "butthole",
        password: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.message).toBe("Please enter a valid email address");
  });
});

describe("loginUser", () => {
  it("should login an existing user", async () => {
    // create a user with same email
    await request(server).post("/api/users/").send({
      name: "lord shitaton",
      email: "doctorpoop@example.com",
      password: "password123",
    });

    // attempt to login with same email
    const res = await request(server).post("/api/users/login").send({
      email: "doctorpoop@example.com",
      password: "password123",
    });

    // assert response
    expect(200);
    expect(res.body.email).toBe("doctorpoop@example.com");
    expect(res.body.accountBalance).toBe(100);
    expect(res.body.isAdmin).toBe(false);
    expect(res.body.token).toBeDefined();
  });

  it("should return error if fields are mising (email)", async () => {
    const res = await request(server)
      .post("/api/users/login")
      .send({
        password: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.message).toBe("Please fill out all fields");
  });

  it("should return error if fields are mising (password)", async () => {
    const res = await request(server)
      .post("/api/users/login")
      .send({
        password: "password",
      })
      .expect(400);

    // assert response
    expect(res.body.message).toBe("Please fill out all fields");
  });

  it("should reject with incorrect email", async () => {
    // create a user with same email
    await request(server).post("/api/users/").send({
      name: "lord shitaton",
      email: "doctorpoop@example.com",
      password: "password123",
    });

    // attempt to login with same email
    const res = await request(server).post("/api/users/login").send({
      email: "doctorpooper@example.com",
      password: "password123",
    });

    // assert response
    expect(400);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("should reject with incorrect password", async () => {
    // create a user with same email
    await request(server).post("/api/users/").send({
      name: "lord shitaton",
      email: "doctorpoop@example.com",
      password: "password123",
    });

    // attempt to login with same email
    const res = await request(server).post("/api/users/login").send({
      email: "doctorpoop@example.com",
      password: "password153",
    });

    // assert response
    expect(400);
    expect(res.body.message).toBe("Invalid email or password");
  });
});

describe("getMe", () => {
  it("should return the logged-in user", async () => {
    await request(server).post("/api/users/").send({
      name: "lord shitaton",
      email: "doctorpoop@example.com",
      password: "password123",
    });

    // attempt to login with same email
    const res = await request(server).post("/api/users/login").send({
      email: "doctorpoop@example.com",
      password: "password123",
    });

    const token = res.body.token;
    console.log(token);
    const id = res.body._id;

    const response = await request(server)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(200);
    expect(response.body._id).toBe(id);
    expect(response.body.name).toBe("lord shitaton");
    expect(response.body.email).toBe("doctorpoop@example.com");
    expect(response.body.accountBalance).toBe(100);
    expect(response.body.isAdmin).toBe(false);
    expect(response.body.token).toBeDefined();
  });

  it("should reject if no token is sent", async () => {
    const res = await request(server).get("/api/users/me").expect(401);

    expect(res.body.message).toBe("Not authorized, no token");
  });
  it("should reject if no token is invalid", async () => {
    const res = await request(server).get("/api/users/me").set("Authorization", `Bearer jhcbvjhsdkjfdnalasndkjlasnkjdnaskjn12321`).expect(401);

    expect(res.body.message).toBe("Not authorized, token failed");
  });
});
