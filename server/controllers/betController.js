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
  const bets = await Bet.find({ user: user._id });
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
  const { betAmount, betType, betOdds, betTeam, betSeries, betGame } = req.body;

  if (
    !betAmount ||
    !betType ||
    !betOdds ||
    !betTeam ||
    !betSeries ||
    !betGame
  ) {
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
    betType,
    betOdds,
    betTeam,
    betSeries,
    betGame,
  });

  res.status(201).json(bet);
});

// @desc    Update a bet
// @route   PUT /api/bets/:id
// @access  Internal
const updateBet = asyncHandler(async (req, res) => {
  const { betResult } = req.body;

  const bet = await Bet.findById(req.params.id);

  if (!bet) {
    res.status(404);
    throw new Error("Bet not found");
  }

  const updatedBet = await Bet.findByIdAndUpdate(
    req.params.id,
    { betResult },
    { new: true }
  );

  res.status(200).json(updatedBet);
});

module.exports = { getBets, placeBet, getBet, updateBet };
