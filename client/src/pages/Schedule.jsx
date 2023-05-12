import formatBySeries from "../utils/formatBySeries";
import { formatDate } from "../utils/formatTime";
import teamKeys from "../utils/teamKeys";

function Schedule() {
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

    const sortedTeams = Object.values(teamKeys).sort((a, b) =>
      a.abb.localeCompare(b.abb)
    );

    for (let team of sortedTeams) {
      promises.push(renderTeamSchedule(team.id, team.abb));
    }

    await Promise.all(promises);
  };

  renderAllTeamSchedules();

  return (
    <>
      <h1>April</h1>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Series 1</th>
            <th>Series 2</th>
            <th>Series 3</th>
            <th>Series 4</th>
            <th>Series 5</th>
            <th>Series 6</th>
            <th>Series 7</th>
            <th>Series 8</th>
            <th>Series 9</th>
          </tr>
        </thead>
        <tbody id="schedule04"></tbody>
      </table>
      <br />
      <h1>May</h1>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Series 9</th>
            <th>Series 10</th>
            <th>Series 11</th>
            <th>Series 12</th>
            <th>Series 13</th>
            <th>Series 14</th>
            <th>Series 15</th>
            <th>Series 16</th>
            <th>Series 17</th>
            <th>Series 18</th>
          </tr>
        </thead>
        <tbody id="schedule05"></tbody>
      </table>
    </>
  );
}

export default Schedule;
