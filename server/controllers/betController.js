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

  res.status(201).json(bet);
});

const updateBets = asyncHandler(async (req, res) => {
  const results = req.body;
  console.log(results);
  const bets = await Bet.find({ betResult: "pending" });
  const updatedBets = await Promise.all(
    // find all bets where game id matches
    bets.map(async (bet) => {
      const result = results.find((result) => result.gameId === bet.gameId);
      console.log("result", result);
      if (result) {
        // if bet team matches result team
        if (
          bet.betTeam.trim().toLowerCase() ===
          result.winner.trim().toLowerCase()
        ) {
          // change bet result to win
          bet.betResult = "win";
          // calculate winnings
          bet.plusMinus = calculateWinnings(bet.betOdds, bet.betAmount);
        } else {
          // change bet result to loss
          bet.betResult = "loss";
          // calculate winnings
          bet.plusMinus = returnNegative(bet.betAmount);
        }
        // save bet
        await bet.save();
      }
      return bet;
    })
  );

  res.status(200).json({ updatedBets });
});

module.exports = { getBets, placeBet, getBet, updateBets };
