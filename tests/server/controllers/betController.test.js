const request = require("supertest");
const server = require("../testserver.js");
const User = require("../models/userModel");
const Bet = require("../models/betModel");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;
let token

beforeAll(async () => {
  server.close();
  await mongoose.disconnect();
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);

  // register and log in user to place bets with

  await request(server).post("/api/users/").send({
    name: "lord shitaton",
    email: "doctorpoop@example.com",
    password: "password123",
  });

  const res = await request(server).post("/api/users/login").send({
    email: "doctorpoop@example.com",
    password: "password123",
  });

 token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
  server.close();
});

describe("placeBets", () => {})