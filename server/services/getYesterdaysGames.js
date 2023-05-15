const axios = require("axios");
const path = require("path");
const { writeFile } = require("fs/promises");
const { write } = require("fs");

const getYesterdaysGames = async () => {
  const date = new Date();
  const yesterday = new Date(date.setDate(date.getDate() - 1))
    .toISOString()
    .slice(0, 10);
  const url = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${yesterday}&endDate=${yesterday}`;

  const { data } = await axios.get(url);
  return data.dates[0].games;
};

const writeYesterdaysGames = async () => {
  const games = await getYesterdaysGames();
  await writeFile(
    path.join(__dirname, "../devData/yesterdaysGames.json"),
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
        console.log("Yesterdays games written successfully\n");
      }
    }
  );
};

module.exports = { getYesterdaysGames, writeYesterdaysGames };
