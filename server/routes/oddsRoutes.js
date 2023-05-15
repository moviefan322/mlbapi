const express = require("express");
const router = express.Router();
const { getOdds, postScores } = require("../controllers/oddsController");

router.get("/", getOdds);
router.get("/scoreboard", postScores);

module.exports = router;
