import teamKeys from "./teamKeys.js";

const keys = teamKeys;

const getTodaysGames = async () => {
  const response = await fetch(
    `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1`
  );
  const data = await response.json();
  return data;
};

const displayTodaysGames = async () => {
  const todaysGames = await getTodaysGames();
  const gameData = todaysGames.dates[0].games;
  console.log(gameData);
  const gameContainer = document.querySelector("#main");

  gameData.forEach((game) => {
    const awayTeam = game.teams.away.team.name;
    const homeTeam = game.teams.home.team.name;
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.innerHTML = `
    <div class="game">
    <h3>${keys[awayTeam].abbreviation} (${game.teams.away.leagueRecord.wins}-${
      game.teams.away.leagueRecord.losses
    }) @ ${keys[homeTeam].abbreviation}(${game.teams.home.leagueRecord.wins}-${
      game.teams.home.leagueRecord.losses
    })</h3>
    <div class="score">
    <img class="icon" src="./assets/images/logos/${
      keys[awayTeam].abbreviation
    }.png" alt="" />
    <h3>${
      game.status.abstractGameCode === "L" ||
      game.status.abstractGameCode === "F"
        ? `${game.teams.away.score}:${game.teams.home.score}`
        : `${formatDate(game.gameDate)}`
    }</h3>
    <img class="icon" src="./assets/images/logos/${
      keys[homeTeam].abbreviation
    }.png" alt="" />
    </div>
    <h4>${
      game.status.abstractGameCode === "L"
        ? `LIVE`
        : game.status.abstractGameCode === "F"
        ? `FINAL`
        : `${formatTime(game.gameDate)}`
    }</h4></div>`;
    gameContainer.appendChild(newDiv);
  });
};

displayTodaysGames();

const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const newDate = `${month}/${day}`;
  return newDate;
};

const formatTime = (date) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const newTime = `${hours}:${minutes}`;
  return newTime;
};
