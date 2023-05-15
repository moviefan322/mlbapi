const request = require("supertest");
const server = require("../testserver.js");
const User = require("../../../server/models/userModel.js");
const Bet = require("../../../server/models/betModel.js");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;
let token;
let id;
let betId;

beforeAll(async () => {
  server.close();
  await mongoose.disconnect();
  User.deleteMany();
  Bet.deleteMany();
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

  id = res.body._id;
  token = res.body.token;
});

afterAll(async () => {
  User.deleteMany();
  Bet.deleteMany();
  await mongoose.disconnect();
  await mongod.stop();
  server.close();
});

describe("placeBets", () => {
  it("should place a bet", async () => {
    const res1 = await request(server).post("/api/users/login").send({
      email: "doctorpoop@example.com",
      password: "password123",
    });

    id = res1.body._id;
    token = res1.body.token;

    const res = await request(server)
      .post("/api/bets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        betAmount: 10,
        betOdds: -125,
        betTeam: "Team 1",
        gameId: 12345,
      });
    expect(201);

    expect(res.body).toBeDefined();
    betId = res.body.bet._id;
    expect(res.body.bet.betOdds).toEqual(-125);
    expect(res.body.bet.betType).toBe("moneyline");
    expect(res.body.bet.betAmount).toEqual(10);
    expect(res.body.bet.betTeam).toBe("Team 1");
    expect(res.body.bet.gameId).toEqual(12345);
    expect(res.body.bet.user).toBe(id);
    expect(res.body.bet.plusMinus).toBe(0);

    // assert database
    const bet = await Bet.findById(betId);
    expect(bet).toBeDefined();
    expect(bet.betType).toBe("moneyline");
    expect(bet.betOdds).toBe(-125);
    expect(bet.betAmount).toBe(10);
    expect(bet.betTeam).toBe("Team 1");
    expect(bet.gameId).toBe(12345);
    expect(bet.plusMinus).toBe(0);

    const user = await User.findOne({ email: "doctorpoop@example.com" });
    expect(user.accountBalance).toBe(90);
  });

  it("should reject a bet if user has insufficient funds", async () => {
    const res = await request(server)
      .post("/api/bets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        betAmount: 999999,
        betOdds: -125,
        betTeam: "Team 1",
        gameId: 12345,
      });

    expect(400);
    expect(res.body.message).toBe("Insufficient funds");
  });

  it("should reject a bet if user is not logged in", async () => {
    const res = await request(server).post("/api/bets").send({
      betAmount: 10,
      betOdds: -125,
      betTeam: "Team 1",
      gameId: 12345,
    });
    expect(400);
    expect(res.body.message).toBe("Not authorized, no token");
  });
});

describe("getBets", () => {
  it("should get all bets for a user", async () => {
    const res = await request(server)
      .get("/api/bets")
      .set("Authorization", `Bearer ${token}`);
    expect(200);
    expect(res.body).toBeDefined();
    expect(res.body).toBeDefined();
    expect(res.body.length).toBe(1);
    expect(res.body[0].betType).toBe("moneyline");
    expect(res.body[0].betOdds).toBe(-125);
    expect(res.body[0].betAmount).toBe(10);
    expect(res.body[0].betTeam).toBe("Team 1");
    expect(res.body[0].gameId).toBe(12345);
    expect(res.body[0].plusMinus).toBe(0);
  });

  it("should reject a request if user is not logged in", async () => {
    const res = await request(server).get("/api/bets");

    expect(400);
    expect(res.body.message).toBe("Not authorized, no token");
  });

  describe("getBet", () => {
    it("should get a bet by id", async () => {
      const res = await request(server)
        .get(`/api/bets/${betId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(200);
      expect(res.body).toBeDefined();
      expect(res.body.betType).toBe("moneyline");
      expect(res.body.betOdds).toBe(-125);
      expect(res.body.betAmount).toBe(10);
      expect(res.body.betTeam).toBe("Team 1");
      expect(res.body.gameId).toBe(12345);
      expect(res.body.plusMinus).toBe(0);
    });

    it("should reject a request if user is not logged in", async () => {
      const res = await request(server).get(`/api/bets/${betId}`);

      expect(400);
      expect(res.body.message).toBe("Not authorized, no token");
    });

    it("should reject a request if bet id is invalid", async () => {
      const res = await request(server)
        .get(`/api/bets/123456789`)
        .set("Authorization", `Bearer ${token}`);

      expect(404);
      expect(res.body.message).toBe("Bet not found");
    });

    it("should reject if it is not the user's bet", async () => {
      await request(server).post("/api/users/").send({
        name: "lady shitaton",
        email: "doctorpooper@example.com",
        password: "password123",
      });

      const res = await request(server).post("/api/users/login").send({
        email: "doctorpooper@example.com",
        password: "password123",
      });

      const newToken = res.body.token;

      const newBet = await request(server)
        .post("/api/bets")
        .set("Authorization", `Bearer ${newToken}`)
        .send({
          betAmount: 10,
          betOdds: -125,
          betTeam: "Team 1",
          gameId: 12345,
        });

      const newBetId = newBet.body.bet._id;

      const res2 = await request(server)
        .get(`/api/bets/${newBetId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(401);
      expect(res2.body.message).toBe("Unauthorized");
    });
  });
});
