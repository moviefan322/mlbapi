// sseController.js
const asyncHandler = require("express-async-handler");

const clients = new Map();
let latestSSEData = null;

const sendSSE = (res, data) => {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

const startSSE = asyncHandler(async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  clients.set(res, { response: res });

  req.on("close", () => {
    clients.delete(res);
  });

  if (latestSSEData) {
    sendSSE(res, latestSSEData);
  }
});

// Function to handle bet update notifications
const handleBetUpdates = (data) => {
  latestSSEData = data;
  clients.forEach((client) => {
    sendSSE(client.response, data);
  });
};

module.exports = {
  startSSE,
  handleBetUpdates,
};
