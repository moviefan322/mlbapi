const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      validate: {
        validator: function (v) {
          return v.length <= 50;
        },
        message: "Name must be less than 50 characters",
      },
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      validate: {
        validator: function (v) {
          return v.length >= 8;
        },
        message: "Password must be at least 8 characters long",
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    accountBalance: {
      type: Number,
      required: true,
      default: 100,
      set: (value) => parseFloat(value.toFixed(2)),
    },
    bets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bet" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
