const axios = require("axios");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const hardCodeOdds = require("../devData/odds.json");

let odds = hardCodeOdds;

const options = {
  method: "GET",
  url: "https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds",
  params: {
    regions: "us",
    oddsFormat: "american",
    markets: "h2h,spreads",
    dateFormat: "iso",
  },
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "odds.p.rapidapi.com",
  },
};

const fetchOdds = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
    odds = response.data;
    fs.writeFile(
      "odds.json",
      JSON.stringify(response.data),
      {
        encoding: "utf8",
        flag: "w",
        mode: 0o666,
      },
      (err) => {
        if (err) console.log(err);
        else {
          console.log("File written successfully\n");
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// Set interval to get odds every 12 hours

setInterval(fetchOdds, 43200000);

// @desc   Get all odds
// @route  GET /odds
// @access Public

const getOdds = asyncHandler(async (req, res) => {
  res.json(odds);
});

// fetchOdds();

module.exports = { getOdds, fetchOdds };
