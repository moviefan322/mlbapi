const express = require("express");
const router = express.Router();
const { getBets, placeBet, getBet } = require("../controllers/betController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getBets).post(protect, placeBet);

router.route("/:id").get(getBet);

module.exports = router;
