const path = require("path");
const axios = require("axios");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const hardCodeOdds = require("../devData/odds.json");
const currentScores = require("../devData/scoreboard.json");
const { scoreboard } = require("../services/fetchResults");

let odds = hardCodeOdds;

// @desc   Get all odds
// @route  GET /odds
// @access Public

const getOdds = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(odds);
  } catch (error) {
    res.status(500).json(error);
  }
});

const postScores = asyncHandler(async (req, res) => {
  const games = await scoreboard();
  console.log(games);
  if (games) {
    try {
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      res.status(200).json(odds);
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = { getOdds, postScores };
