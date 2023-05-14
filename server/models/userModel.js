const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
