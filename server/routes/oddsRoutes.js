const express = require("express");
const router = express.Router();
const {
  getOdds,
  postScores,
  postYesterdaysScores,
} = require("../controllers/oddsController");

router.get("/", getOdds);
router.get("/scoreboard", postScores);
router.get("/yesterdaysScores", postYesterdaysScores);

module.exports = router;
