const express = require("express");
const router = express.Router();
const {
  getBets,
  placeBet,
  getBet,
  getAllBets,
} = require("../controllers/betController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getBets).post(protect, placeBet);
router.route("/allBets").get(getAllBets);

router.route("/:id").get(protect, getBet);

module.exports = router;
