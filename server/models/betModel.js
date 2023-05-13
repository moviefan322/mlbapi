const mongoose = require("mongoose");

const betSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    betSeries: {
      type: Number,
      required: true,
    },
    betGame: {
      type: Number,
      required: true,
    },
    betResult: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
