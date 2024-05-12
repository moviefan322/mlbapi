const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { getTodaysGames } = require("./todaysGames");

let games = [];

const getGameResults = async () => {
  try {
    games = await getTodaysGames();
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

  const postponedGames = games.filter(
    (game) => game.status.codedGameState === "D"
  );

  postponedGames.forEach((game) => {
    gameResults.push({
      gameId: game.gamePk,
      winner: "PPD",
      loser: "PPD",
    });
  });

  return gameResults;
};

const scoreboard = async () => {
  const games = await getTodaysGames();
  return games;
};

module.exports = { getGameResults, scoreboard };
