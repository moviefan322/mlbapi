import teamKeys from "./teamKeys.js";
import formatBySeries from "./formatBySeries.js";

// console.log(teamKeys);

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

const renderTeamSchedule = async (id, abbr) => {
  const data = await formatBySeries();
  const schedule = data[id];


  const schedule04Container = document.querySelector("#schedule04");
  const row04 = document.createElement("tr");
  row04.innerHTML = `
  <tr>
  <td>${abbr}</td>`;
  schedule04Container.appendChild(row04);
  for (let i = 1; i <= 9; i++) {
    const td = document.createElement("td");
    td.classList.add("unit");
    const currentSeries = schedule[`${i}`];
    const homeRaw = currentSeries[0].teams.home.team.name;
    const awayRaw = currentSeries[0].teams.away.team.name;
    const home = teamKeys[homeRaw].abb;
    const away = teamKeys[awayRaw].abb;
    const isHomeTeam = currentSeries[0].teams.home.team.id === id;
    let gameResults = "";
    for (let j = 0; j < currentSeries.length; j++) {
      const game = currentSeries[j];
      const isAwayTeam = game.teams.away.team.id === id;
      const isHomeTeam = game.teams.home.team.id === id;
      const isWinner =
        (isAwayTeam && game.teams.away.isWinner) ||
        (isHomeTeam && game.teams.home.isWinner);
      const isLoser =
        (isAwayTeam && game.teams.away.isWinner === false) ||
        (isHomeTeam && game.teams.home.isWinner === false);
      const result = isWinner
        ? "<span class='green'>W</span>"
        : isLoser
        ? "<span class='red'>L</span>"
        : "";
      gameResults += result;
      if (j < currentSeries.length - 1) {
        gameResults += "-";
      }
    }

    td.innerHTML = `
    ${formatDate(currentSeries[0].gameDate)}-${formatDate(
      currentSeries[currentSeries.length - 1].gameDate
    )}
  <br>${isHomeTeam ? `v.${away}` : `@${home}`}
  <br>
  ${gameResults}
    `;
    row04.appendChild(td);
  }



  const scheduleContainer = document.querySelector("#schedule05");
  const row = document.createElement("tr");
  row.innerHTML = `
  <tr>
  <td>${abbr}</td>`;
  scheduleContainer.appendChild(row);
  for (let i = 9; i <= 18; i++) {
    const td = document.createElement("td");
    td.classList.add("unit");
    const currentSeries = schedule[`${i}`];
    const homeRaw = currentSeries[0].teams.home.team.name;
    const awayRaw = currentSeries[0].teams.away.team.name;
    const home = teamKeys[homeRaw].abb;
    const away = teamKeys[awayRaw].abb;
    const isHomeTeam = currentSeries[0].teams.home.team.id === id;
    let gameResults = "";
    for (let j = 0; j < currentSeries.length; j++) {
      const game = currentSeries[j];
      const isAwayTeam = game.teams.away.team.id === id;
      const isHomeTeam = game.teams.home.team.id === id;
      const isWinner =
        (isAwayTeam && game.teams.away.isWinner) ||
        (isHomeTeam && game.teams.home.isWinner);
      const isLoser =
        (isAwayTeam && game.teams.away.isWinner === false) ||
        (isHomeTeam && game.teams.home.isWinner === false);
      const result = isWinner
        ? "<span class='green'>W</span>"
        : isLoser
        ? "<span class='red'>L</span>"
        : "";
      gameResults += result;
      if (j < currentSeries.length - 1) {
        gameResults += "-";
      }
    }

    td.innerHTML = `
    ${formatDate(currentSeries[0].gameDate)}-${formatDate(
      currentSeries[currentSeries.length - 1].gameDate
    )}
  <br>${isHomeTeam ? `v.${away}` : `@${home}`}
  <br>
  ${gameResults}
    `;
    row.appendChild(td);
  }
};

const renderAllTeamSchedules = async () => {
  const promises = [];

  for (let key in teamKeys) {
    promises.push(renderTeamSchedule(teamKeys[key].id, teamKeys[key].abb));
  }

  await Promise.all(promises);
};

renderAllTeamSchedules();
