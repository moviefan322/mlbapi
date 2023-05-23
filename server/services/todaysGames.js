const axios = require("axios");
const fs = require("fs");
const path = require("path");

const getTodaysGames = async () => {
  try {
    const response = await axios.get(
      `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1`
    );
    return response.data.dates[0].games;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

const writeTodaysGames = async () => {
  const games = await getTodaysGames();
  fs.writeFile(
    path.join(__dirname, "../devData/scoreboard.json"),
    JSON.stringify(games),
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Scoreboard written successfully\n");
      }
    }
  );
};

module.exports = { getTodaysGames, writeTodaysGames };
