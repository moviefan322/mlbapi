import teamKeys from "./teamKeys.js";

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

const teamSchedule = async (id) => {
  const response = await fetch(
    `https://statsapi.mlb.com/api/v1/schedule?lang=en&sportId=1&hydrate=team(venue(timezone)),venue(timezone),game(seriesStatus,seriesSummary,tickets,promotions,sponsorships,content(summary,media(epg))),seriesStatus,seriesSummary,linescore,tickets,event(tickets),radioBroadcasts,broadcasts(all)&season=2023&startDate=2023-03-30&endDate=2023-06-30&teamId=${id}&eventTypes=primary&scheduleTypes=games,events,xref`
  );
  const data = await response.json();
  console.log(data);
  const dates = data.dates;

  const series = dates.reduce((acc, date) => {
    const game = date.games[0];
    const seriesNumber = game.teams.away.seriesNumber;
    const seriesVariableName = `series${seriesNumber}`;

    if (!acc[seriesVariableName]) {
      acc[seriesVariableName] = [];
    }

    acc[seriesVariableName].push(game);
    return acc;
  }, {});

  console.log(series);
  return series;
};

const renderTeamSchedule = async (id, abbreviation) => {
  const schedule = await teamSchedule(id);
  console.log("sched", schedule);
  const scheduleContainer = document.querySelector("#schedule");
  const row = document.createElement("tr");
  row.innerHTML = `
  <tr>
  <td>${abbreviation}</td>`;
  scheduleContainer.appendChild(row);
  for (let i = 9; i <= 20; i++) {
    const td = document.createElement("td");
    const currentSeries = schedule[`series${i}`];
    const home = currentSeries[0].teams.home.team.name;
    const away = currentSeries[0].teams.away.team.name;
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
      const result = isWinner ? "W" : isLoser ? "L" : "";
      gameResults += result;
      if (j < currentSeries.length - 1) {
        gameResults += "-";
      }
    }

    td.innerHTML = `
    ${formatDate(currentSeries[0].gameDate)}-${formatDate(
      currentSeries[currentSeries.length - 1].gameDate
    )}
  <br>
  ${teamKeys[away].abbreviation} @ ${teamKeys[home].abbreviation}
  <br>
  ${gameResults}
    `;
    row.appendChild(td);
  }
};

teamSchedule(146);
renderTeamSchedule(146, "MIA");
