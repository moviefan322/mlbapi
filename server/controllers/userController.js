const asyncHandler = require("express-async-handler");

// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  res.send("success");
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

  res.send("success");
});

module.exports = {
  registerUser,
  loginUser,
};
