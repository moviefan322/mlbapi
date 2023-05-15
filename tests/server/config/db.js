const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.createConnection(process.env.MONGO_URI_TEST);
    conn.model("User", require("../models/userModel"));
    conn.model("Bet", require("../models/betModel"));
    console.log(`Test DB connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
