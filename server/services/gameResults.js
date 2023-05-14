const axios = require("axios");

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
  return gameResults;
};

getGameResults();

module.exports = getGameResults;
