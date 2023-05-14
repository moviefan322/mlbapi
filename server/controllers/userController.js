const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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
      token: generateToken(user._id),
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
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
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
      token: generateToken(user._id),
    });
  }
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc get current user
// @route GET /users/me
// @access Private

const getMe = asyncHandler(async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401);
    throw new Error("Authorization header missing");
  }

  const token = authorizationHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401);
    throw new Error("Invalid token");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
