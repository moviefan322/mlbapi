const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Bet = require("../models/betModel");
const {
  calculateWinnings,
  returnNegative,
} = require("../../client/src/utils/moneyLine");

// @desc    Get a users bets
// @route   GET /api/bets
// @access  Private
const getBets = asyncHandler(async (req, res) => {
  // get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // get bets from user
  const bets = await Bet.aggregate([
    { $match: { user: user._id } },
    { $sort: { createdAt: -1 } },
  ]);
  res.status(200).json(bets);
});

// @desc    Get a bet
// @route   GET /api/bets/:id
// @access  Private
const getBet = asyncHandler(async (req, res) => {
  // get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // get bet from user
  let bet;
  try {
    bet = await Bet.findById(req.params.id);
  } catch (error) {
    res.status(404);
    throw new Error("Bet not found");
  }

  if (bet.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  try {
    res.status(200).json(bet);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

const getAllBets = asyncHandler(async (req, res) => {
  const bets = await Bet.find({});

  res.status(200).json(bets);
})

// @desc    Place a bet
// @route   POST /api/bets
// @access  Private
const placeBet = asyncHandler(async (req, res) => {
  const { betAmount, betOdds, betTeam, gameId, gamePlain } = req.body;

  if (!betAmount || !betOdds || !betTeam || !gameId) {
    res.status(400);
    throw new Error("Missing bet information");
  }

  // get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // check if user has enough money to place bet
  if (user.accountBalance < betAmount) {
    res.status(400);
    throw new Error("Insufficient funds");
  }

  // create bet
  const bet = await Bet.create({
    user: user._id,
    betAmount,
    betType: "moneyline", // TODO: add bet type to request body
    betOdds,
    betTeam,
    gameId,
    gamePlain,
    betResult: "pending", // TODO: add bet result to request body
  });

  // adjust users account balance
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $inc: { accountBalance: returnNegative(betAmount) } },
      { new: true }
    );
    res.status(201).json({ bet, accountBalance: updatedUser.accountBalance });
  } catch (error) {
    res.status(500).json({ error: "Error updating user account balance" });
  }

  res.status(201).json({ bet, accountBalance: user.accountBalance });
});

module.exports = { getBets, placeBet, getBet };
