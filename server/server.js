const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

// Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} 🚀`);
});
