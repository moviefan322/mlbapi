const mongoose = require("mongoose");

const betSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter a user"],
      ref: "User",
      index: true,
    },
    betAmount: {
      type: Number,
      required: [true, "Please enter the bet amount"],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Bet amount must be greater than zero",
      },
    },
    betType: {
      type: String,
      default: "moneyline",
    },
    betOdds: {
      type: Number,
      required: [true, "Please enter the odds"],
    },
    betTeam: {
      type: String,
      required: [true, "Please select a team"],
    },
    gameId: {
      type: Number,
      required: [true, "Please enter the game ID"],
    },
    gamePlain: {
      type: String,
    },
    betResult: {
      type: String,
      enum: ["pending", "win", "loss", "cancelled"],
      default: "pending",
      validate: {
        validator: function (value) {
          return (
            value === "pending" ||
            value === "win" ||
            value === "loss" ||
            value === "cancelled"
          );
        },
        message: "Ivalid bet result!",
      },
    },
    plusMinus: {
      type: Number,
      default: 0,
      cast: false,
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
    runValidators: true,
  }
);

betSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

betSchema.pre("updateOne", function (next) {
  this.options.runValidators = true;
  next();
});

const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
