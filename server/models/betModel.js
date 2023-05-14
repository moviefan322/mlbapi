const mongoose = require("mongoose");

const betSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    betAmount: {
      type: Number,
      required: true,
    },
    betType: {
      type: String,
      default: "Moneyline",
    },
    betOdds: {
      type: Number,
      required: true,
    },
    betTeam: {
      type: String,
      required: true,
    },
    gameId: {
      type: Number,
      required: true,
    },
    gamePlain: {
      type: String,
    },
    betResult: {
      type: String,
      default: "Pending",
    },
    plusMinus: {
      type: Number,
      default: 0,
      cast: false,
    },
  },
  {
    timestamps: true,
  }
);

const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
