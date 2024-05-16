const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const SocketIO = require("socket.io");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
const { runAllTasks } = require("./services/scheduledTasks");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

// Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

// Scheduled tasks
runAllTasks();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/odds", require("./routes/oddsRoutes"));
app.use("/api/bets", require("./routes/betRoutes"));

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the sports app" });
  });
}

// Connect to MongoDB
connectDB();

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} 🚀`.brightYellow.bold);
});
