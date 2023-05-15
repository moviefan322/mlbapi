const axios = require("axios");
const path = require("path");
const fs = require("fs");

const getGameResults = async () => {
  let games = [];
  try {
    const response = await axios.get(
      `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1`
    );
    games = response.data.dates[0].games;
  } catch (error) {
    console.error(error);
  }

  const completedGames = games.filter(
    (game) => game.status.codedGameState === "F"
  );

  let gameResults = [];

  completedGames.forEach((game) => {
    let winner;
    let loser;
    if (game.teams.away.isWinner === true) {
      winner = game.teams.away.team.name;
      loser = game.teams.home.team.name;
    } else {
      winner = game.teams.home.team.name;
      loser = game.teams.away.team.name;
    }
    gameResults.push({
      gameId: game.gamePk,
      winner,
      loser,
    });
  });

  fs.writeFile(
    path.join(__dirname, "../devData/scoreboard.json"),
    JSON.stringify(games),
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      if (err) console.log(err);
      else {
        console.log("Scoreboard written successfully\n");
      }
    }
  );
  return gameResults;
};

getGameResults();

module.exports = { getGameResults };
