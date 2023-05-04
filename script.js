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
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.innerHTML = `
    <h3>${game.teams.away.team.name} (${game.teams.away.leagueRecord.wins}-${
      game.teams.away.leagueRecord.losses
    }) @ ${game.teams.home.team.name}(${game.teams.home.leagueRecord.wins}-${
      game.teams.home.leagueRecord.losses
    })</h3>
    <h3>${
      game.status.abstractGameCode === "L" || "F"
        ? `${game.teams.away.score}:${game.teams.home.score}`
        : `${formatDate(game.gameDate)}`
    }</h3>
    <h4>${
      game.status.abstractGameCode === "L"
        ? `LIVE`
        : game.status.abstractGameCode === "F"
        ? `FINAL`
        : "{formatTime(game.gameDate)}"
    }</h4>
    <img class="icon" src="./assets/images/baseball.svg" alt="" />
    <img class="icon" src="./assets/images/baseball.svg" alt="" />`;
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
