const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Bet = require("../models/betModel");

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

  const bet = await Bet.findById(req.params.id);

  if (bet.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  res.status(200).json(bet);
});

// @desc    Place a bet
// @route   POST /api/bets
// @access  Private
const placeBet = asyncHandler(async (req, res) => {
  const { betAmount, betOdds, betTeam, gameId } = req.body;

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

  // create bet
  const bet = await Bet.create({
    user: user._id,
    betAmount,
    betType: "moneyline", // TODO: add bet type to request body
    betOdds,
    betTeam,
    gameId,
    betPlain,
    betResult: "pending", // TODO: add bet result to request body
  });

  res.status(201).json(bet);
});

module.exports = { getBets, placeBet, getBet };
