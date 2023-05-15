const express = require("express");
const router = express.Router();

// SSE route
router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Example: Send a message every 5 seconds
  const intervalId = setInterval(() => {
    sendEvent({ message: "Hello, SSE!" });
  }, 5000);

  // Clean up resources when the client closes the connection
  req.on("close", () => {
    clearInterval(intervalId);
  });
});

module.exports = router;
