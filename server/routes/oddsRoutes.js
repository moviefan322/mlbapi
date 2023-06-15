const express = require("express");
const router = express.Router();
const {
  getOdds,
  postScores,
  postYesterdaysScores,
  postXXXgames,
  postSchedule,
} = require("../controllers/oddsController");

router.get("/", getOdds);
router.get("/scoreboard", postScores);
router.get("/schedule", postSchedule);
router.get("/yesterdaysScores", postYesterdaysScores);
router.get("/:date", postXXXgames);

module.exports = router;
