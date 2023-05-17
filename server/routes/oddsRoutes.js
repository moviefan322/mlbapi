const express = require("express");
const router = express.Router();
const {
  getOdds,
  postScores,
  postYesterdaysScores,
  postXXXgames

} = require("../controllers/oddsController");

router.get("/", getOdds);
router.get("/scoreboard", postScores);
router.get("/yesterdaysScores", postYesterdaysScores);
router.get("/:date", postXXXgames)

module.exports = router;
