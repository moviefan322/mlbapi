const express = require("express");
const cors = require("cors");
const colors = require("colors");
const { errorHandler } = require("../../server/middleware/errorHandler");
require("dotenv").config();
const connectDB = require("../../server/config/db");

const PORT = 3002;

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

// Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/users", require("../../server/routes/userRoutes"));

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`🚀 Server is running on port ${port} 🚀`.brightYellow.bold);
});

module.exports = server;
