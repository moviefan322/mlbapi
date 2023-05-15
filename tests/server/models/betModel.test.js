const User = require("../../../server/models/userModel.js");
const Bet = require("../../../server/models/betModel.js");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let id;

beforeAll(async () => {
  await mongoose.disconnect();
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
  await User.deleteMany();

  await User.create({
    name: "Doctor Queaf",
    email: "fatman@fart.com",
    password: "password123",
  });

  const user = await User.findOne({ email: "fatman@fart.com" });

  id = user._id;
});

afterEach(async () => {
  await User.deleteMany();
  await Bet.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("Bet model", () => {
  it("should be able to save a new bet to the database", async () => {
    const bet = new Bet({
      user: id,
      betAmount: 50,
      betOdds: 100,
      betTeam: "Team A",
      gameId: 123456,
      gamePlain: "Team A vs Team B",
    });

    const savedBet = await bet.save();

    expect(savedBet._id).toBeDefined();
    expect(savedBet.user).toBe(bet.user);
    expect(savedBet.betAmount).toBe(bet.betAmount);
    expect(savedBet.betType).toBe("moneyline");
    expect(savedBet.betOdds).toBe(bet.betOdds);
    expect(savedBet.betTeam).toBe(bet.betTeam);
    expect(savedBet.gameId).toBe(bet.gameId);
    expect(savedBet.gamePlain).toBe(bet.gamePlain);
    expect(savedBet.betResult).toBe("pending");
    expect(savedBet.plusMinus).toBe(0);

    const dbBet = await Bet.findById(savedBet._id);

    expect(dbBet).toBeDefined();
    expect(dbBet.user).toEqual(bet.user);
    expect(dbBet.betAmount).toBe(bet.betAmount);
    expect(dbBet.betType).toBe("moneyline");
    expect(dbBet.betOdds).toBe(bet.betOdds);
    expect(dbBet.betTeam).toBe(bet.betTeam);
    expect(dbBet.gameId).toBe(bet.gameId);
    expect(dbBet.gamePlain).toBe(bet.gamePlain);
    expect(dbBet.betResult).toBe("pending");
    expect(dbBet.plusMinus).toBe(0);
  });

  it("should not save a new bet to the database if user is missing", async () => {
    const bet = new Bet({
      betAmount: 50,
      betOdds: 100,
      betTeam: "Team A",
      gameId: 123456,
    });

    let error;

    try {
      await bet.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.user.message).toBe("Please enter a user");
  });

  it("should not save a new bet to the database if bet amount is missing", async () => {
    const bet = new Bet({
      user: id,
      betOdds: 100,
      betTeam: "Team A",
      gameId: 123456,
    });

    let error;

    try {
      await bet.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.betAmount.message).toBe("Please enter the bet amount");
  });

  it("should not save a new bet to the database if odds are missing", async () => {
    const bet = new Bet({
      user: id,
      betAmount: 50,
      betTeam: "Team A",
      gameId: 123456,
    });

    let error;

    try {
      await bet.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.betOdds.message).toBe("Please enter the odds");
  });

  it("should not save a new bet to the database if user is missing", async () => {
    const bet = new Bet({
      user: id,
      betOdds: 100,
      betAmount: 50,
      gameId: 123456,
    });

    let error;

    try {
      await bet.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.betTeam.message).toBe("Please select a team");
  });

  it("should not save a new bet to the database if user is missing", async () => {
    const bet = new Bet({
      user: id,
      betAmount: 50,
      betOdds: 100,
      betTeam: "Team A",
    });

    let error;

    try {
      await bet.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.gameId.message).toBe("Please enter the game ID");
  });

  it("should update a bet in the database (win)", async () => {
    const bet = await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team A",
      gameId: 123456,
    });

    const updatedBet = await Bet.findOneAndUpdate(
      { _id: bet._id },
      { betResult: "win", plusMinus: 150 },
      { new: true }
    );

    expect(updatedBet._id).toEqual(bet._id);
    expect(updatedBet.betResult).toBe("win");
    expect(updatedBet.plusMinus).toBe(150);
  });

  it("should update a bet in the database (loss)", async () => {
    const bet = await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team A",
      gameId: 123456,
    });

    const updatedBet = await Bet.findOneAndUpdate(
      { _id: bet._id },
      { betResult: "loss", plusMinus: -100 },
      { new: true }
    );

    expect(updatedBet._id).toEqual(bet._id);
    expect(updatedBet.betResult).toBe("loss");
    expect(updatedBet.plusMinus).toBe(-100);
  });

  it("should reject an update without invalid input (string)", async () => {
    const bet = await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team A",
      gameId: 123456,
    });

    let error;

    try {
      await Bet.findOneAndUpdate(
        { _id: bet._id },
        { betResult: "win", plusMinus: "150" },
        { new: true }
      );
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.CastError);
  });

  it("should reject an update without invalid input (enum)", async () => {
    const bet = await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team A",
      gameId: 123456,
    });

    let error;

    try {
      const savedBet = await Bet.findOneAndUpdate(
        { _id: bet._id },
        { betResult: "poop", plusMinus: 150 },
        { new: true }
      );
      console.log(savedBet);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.betResult.message).toBe(
      "`poop` is not a valid enum value for path `betResult`."
    );
  });

  it("should delete a bet from the database", async () => {
    const bet = await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team A",
      gameId: 123456,
    });

    const deletedBet = await Bet.findOneAndDelete({ _id: bet._id });

    expect(deletedBet._id).toEqual(bet._id);
  });

  it("should retrieve all bets from the database", async () => {
    await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team A",
      gameId: 123456,
    });

    await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team B",
      gameId: 123456,
    });

    await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team C",
      gameId: 123456,
    });

    const bets = await Bet.find();

    console.log(bets);

    expect(bets.length).toEqual(3);
  });

  it("should retrieve a bet from the database by ID", async () => {
    const bet = await Bet.create({
      user: id,
      betAmount: 100,
      betOdds: +150,
      betTeam: "Team A",
      gameId: 123456,
    });

    const retrievedBet = await Bet.findById(bet._id);

    expect(retrievedBet._id).toEqual(bet._id);
    expect(retrievedBet.betAmount).toBe(100);
    expect(retrievedBet.betOdds).toBe(150);
    expect(retrievedBet.betTeam).toBe("Team A");
    expect(retrievedBet.gameId).toBe(123456);
    expect(retrievedBet.betResult).toBe("pending");
    expect(retrievedBet.plusMinus).toBe(0);
    expect(retrievedBet.user).toEqual(id);
  });

  it("should validate a bet with valid input", async () => {
    const bet = new Bet({
      user: id,
      betAmount: 50,
      betOdds: 100,
      betTeam: "Team A",
      gameId: 123456,
    });

    const validationError = bet.validateSync();

    expect(validationError).toBeUndefined();
  });

  it("should reject a betAmount !> 0", async () => {
    const bet = new Bet({
      user: id,
      betAmount: 0,
      betOdds: 100,
      betTeam: "Team A",
      gameId: 123456,
    });

    let error;

    try {
      await bet.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.betAmount.message).toBe(
      "Bet amount must be greater than zero"
    );
  });
});
