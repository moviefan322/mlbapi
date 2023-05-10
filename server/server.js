const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} 🚀`);
});
