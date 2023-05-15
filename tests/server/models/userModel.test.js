const User = require("../../../server/models/userModel.js");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

beforeAll(async () => {
  await mongoose.disconnect();
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
  User.deleteMany();
});

afterEach(async () => {
  User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("User model", () => {
  it("should be able to save a new user to the database", async () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    });

    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(user.name);
    expect(savedUser.email).toBe(user.email);
    expect(savedUser.password).toBe(user.password);
    expect(savedUser.isAdmin).toBe(false);
    expect(savedUser.accountBalance).toBe(100);
  });

  it("should not save a new user to the database if required fields are missing", async () => {
    const user = new User({
      name: "John Doe",
      password: "password123",
    });

    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.email.message).toBe("Please enter your email");
  });

  it("should not save user without name field", async () => {
    const user = new User({
      email: "test@example.com",
      password: "testpassword",
      isAdmin: false,
      accountBalance: 100,
    });
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });

  it("should be able to update an existing user in the database", async () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe2@example.com",
      password: "password123",
    });

    await user.save();

    user.name = "Jane Doe";
    user.email = "janedoe2@example.com";
    user.isAdmin = true;
    user.accountBalance = 200;

    const updatedUser = await user.save();

    expect(updatedUser.name).toBe(user.name);
    expect(updatedUser.email).toBe(user.email);
    expect(updatedUser.isAdmin).toBe(true);
    expect(updatedUser.accountBalance).toBe(200);
  });

  it("should not save user without password field", async () => {
    const user = new User({
      email: "tesxxxxt@example.com",
      name: "testuser",
      isAdmin: false,
      accountBalance: 100,
    });
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
  });

  it("should be able to delete an existing user from the database", async () => {
    const user = new User({
      name: "John Doe",
      email: "johndo4e@example.com",
      password: "password123",
    });

    await user.save();

    const deletedUser = await user.deleteOne();

    expect(deletedUser._id).toBeDefined();
    expect(deletedUser.name).toBe(user.name);
    expect(deletedUser.email).toBe(user.email);
    expect(deletedUser.password).toBe(user.password);
    expect(deletedUser.isAdmin).toBe(false);
    expect(deletedUser.accountBalance).toBe(100);
  });

  it("should be able to find an existing user in the database", async () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe5@example.com",
      password: "password123",
    });

    await user.save();

    const foundUser = await User.findOne({ email: "johndoe5@example.com" });
    expect(foundUser.name).toBe("John Doe");
    expect(foundUser.email).toBe("johndoe5@example.com");
    expect(foundUser.password).toBe("password123");
    expect(foundUser.isAdmin).toBe(false);
    expect(foundUser.accountBalance).toBe(100);
  });

  it("should reject a user with an invalid email", async () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe",
      password: "password123",
    });

    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    console.log(error);

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.email.message).toBe("Please enter a valid email");
  });

  it("should reject a user with a password less than 8 characters", async () => {
    const user = new User({
      name: "Butthole Bob",
      email: "poopeater@pervert.biz",
      password: "1234567",
    });

    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.password.message).toBe(
      "Password must be at least 8 characters long"
    );
  });

  it("should not allow duplicate emails", async () => {
    const user = new User({
      name: "Butthole Bob",
      email: "poopeater@pervert.biz",
      password: "12345678",
    });

    await user.save();

    const user2 = new User({
      name: "Butthole Bob",
      email: "poopeater@pervert.biz",
      password: "12345678",
    });

    let error;

    try {
      await user2.save();
    } catch (err) {
      error = err;
    }

    console.log(error);

    expect(error.code).toBe(11000);
    expect(error.keyValue.email).toBe("poopeater@pervert.biz");
  });

  it("should set isAdmin to false by default", async () => {
    const user = new User({
      name: "Butthole Bob",
      email: "buttpirate@pervert.biz",
      password: "12345678",
    });

    await user.save();

    expect(user.isAdmin).toBe(false);
  });

  it("should set accountBalance to 100 by default", async () => {
    const user = new User({
      name: "Butthole Bob",
      email: "buttpirate2@pervert.biz",
      password: "12345678",
    });

    await user.save();

    expect(user.accountBalance).toBe(100);
  });

  it("should reject a name with too many characters", async () => {
    const user = new User({
      name: "ButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButtholeButthole Bob",
      email: "buttpirate2@pervert.biz",
      password: "12345678",
    });

    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name.message).toBe(
      "Name must be less than 50 characters"
    );
  });
});
