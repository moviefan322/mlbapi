const axios = require("axios");
const asyncHandler = require("express-async-handler");

let odds = [];
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

// Set interval to get odds every 4 hours

const fetchOdds = async () => {
  setInterval(async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      odds = response.data;
    } catch (error) {
      console.error(error);
    }
  }, 14400000);
};

// @desc   Get all odds
// @route  GET /odds
// @access Public

const getOdds = asyncHandler(async (req, res) => {
  res.json(odds);
});
