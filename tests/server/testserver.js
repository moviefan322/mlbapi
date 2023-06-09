const express = require("express");
const cors = require("cors");
const colors = require("colors");
const { errorHandler } = require("../../server/middleware/errorHandler");
require("dotenv").config();

const PORT = 3002;

const app = express();

app.use(cors());

// Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("../../server/routes/userRoutes"));
app.use("/api/bets", require("../../server/routes/betRoutes"));
app.use("/api/odds", require("../../server/routes/oddsRoutes"));

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`🚀 Server is running on port ${port} 🚀`.brightYellow.bold);
});

module.exports = server;
