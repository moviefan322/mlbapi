const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { startSSE } = require("../controllers/sseController");

// SSE route
router.get("/", startSSE);

module.exports = router;
