const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Bet = require("../models/betModel");
const { getGameResults } = require("./fetchResults");
const {
  calculateWinnings,
  returnNegative,
} = require("../../client/src/utils/moneyLine");

const updateBetsInternally = async (gameResults) => {
  const results = gameResults;
  const bets = await Bet.find({ betResult: "pending" });
  const updatedBets = await Promise.all(
    // find all bets where game id matches
    bets.map(async (bet) => {
      const result = results.find((result) => result.gameId === bet.gameId);
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

  // adjust users account balance
  const winningBets = updatedBets.filter((bet) => bet.betResult === "win");
  for (const bet of winningBets) {
    const deposit = bet.plusMinus + bet.betAmount;
    await User.findByIdAndUpdate(bet.user, {
      $inc: { accountBalance: deposit },
    });
  }
  console.log("Bets updated");
};

const callUpdateBets = async () => {
  try {
    const gameResults = await getGameResults();
    await updateBetsInternally(gameResults);
  } catch (error) {
    console.error(`Error updating bets: ${error}`);
  }
};

module.exports = { callUpdateBets };
