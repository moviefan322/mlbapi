const express = require("express");
const cors = require("cors");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
const { runAllTasks } = require("./services/scheduledTasks");
const connectDB = require("./config/db");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

const wss = new WebSocket.Server({ noServer: true });

const app = express();

app.use(cors());

// Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Scheduled tasks
runAllTasks();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/odds", require("./routes/oddsRoutes"));
app.use("/api/bets", require("./routes/betRoutes"));
app.use("/api/sse", require("./routes/sseRoutes"));

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} 🚀`.brightYellow.bold);
});

server.on("upgrade", (request, socket, head) => {
  wss.close();
});
