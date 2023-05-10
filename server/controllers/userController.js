const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  // Check if user exists
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Check if all fields are filled out
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
    accountBalance: 100,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accountBalance: user.accountBalance,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  const user = await User.findOne({ email });
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!user || !checkPassword) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  if (user && checkPassword) {
    res.status(200);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accountBalance: user.accountBalance,
      isAdmin: user.isAdmin,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
