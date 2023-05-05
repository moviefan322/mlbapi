import teamKeys from "./teamKeys.js";

const keys = teamKeys;

const getTodaysGames = async () => {
  const response = await fetch(
    `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1`
  );
  const data = await response.json();
  return data;
};

const getSingleGameData = async (gamePk) => {
  const response = await fetch(
    `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
  );
  const data = await response.json();
  return data;
};

const getFullSchedule = async () => {
  const response = await fetch(
    "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-30&endDate=2023-10-01"
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const displayTodaysGames = async () => {
  const todaysGames = await getTodaysGames();
  const gameData = todaysGames.dates[0].games;
  const gameContainer = document.querySelector("#main");

  gameData.forEach(async (game) => {
    const singleGame = await getSingleGameData(game.gamePk);
    const awayTeam = game.teams.away.team.name;
    const homeTeam = game.teams.home.team.name;
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.innerHTML = `
    <h3>${keys[awayTeam].abb} (${game.teams.away.leagueRecord.wins}-${
      game.teams.away.leagueRecord.losses
    }) @ ${keys[homeTeam].abb} (${game.teams.home.leagueRecord.wins}-${
      game.teams.home.leagueRecord.losses
    })</h3>
    <div class="score">
    <img class="icon" src="./assets/images/logos/${
      keys[awayTeam].abb
    }.png" alt="" />
    <div class="data"><h3>${
      game.status.abstractGameCode === "L" ||
      game.status.abstractGameCode === "F"
        ? `${game.teams.away.score}:${game.teams.home.score}`
        : `${formatTime(game.gameDate)}`
    }</h3>
    <br>
    <h6>${
      game.status.abstractGameCode === "L"
        ? "P: " + singleGame.liveData.plays.currentPlay.matchup.pitcher.fullName
        : ""
    }${
      game.status.abstractGameCode === "F"
        ? "W: " + singleGame.liveData.decisions.winner.fullName
        : ""
    }</h6>
    <h6>${
      game.status.abstractGameCode === "L"
        ? "B: " + singleGame.liveData.plays.currentPlay.matchup.batter.fullName
        : ""
    }${
      game.status.abstractGameCode === "F"
        ? "L: " + singleGame.liveData.decisions.loser.fullName
        : ""
    }</h6>
    </div>
    <img class="icon" src="./assets/images/logos/${
      keys[homeTeam].abb
    }.png" alt="" />
    </div>
    <h4 class="bottom">${
      game.status.abstractGameCode === "L"
        ? `${singleGame.liveData.linescore.inningHalf} ${singleGame.liveData.linescore.currentInning}`
        : game.status.abstractGameCode === "F"
        ? `FINAL`
        : `${singleGame.gameData.probablePitchers.away.fullName} vs. ${singleGame.gameData.probablePitchers.home.fullName}`
    }</h4>`;
    gameContainer.appendChild(newDiv);
  });
};

displayTodaysGames();
getFullSchedule();

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
