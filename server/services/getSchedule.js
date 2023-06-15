import fetch from "node-fetch";

const getFullSchedule = async () => {
  const response = await fetch(
    "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-30&endDate=2023-10-01"
  );
  const data = await response.json();
  const games = data.dates.flatMap((date) => date.games);
  const teams = {};

  games.forEach((game) => {
    const homeTeamId = game.teams.home.team.id;
    const awayTeamId = game.teams.away.team.id;

    if (!teams[homeTeamId]) {
      teams[homeTeamId] = {};
    }
    if (!teams[homeTeamId][game.seriesNumber]) {
      teams[homeTeamId][game.seriesNumber] = [];
    }
    if (!teams[awayTeamId]) {
      teams[awayTeamId] = {};
    }
    if (!teams[awayTeamId][game.seriesNumber]) {
      teams[awayTeamId][game.seriesNumber] = [];
    }

    teams[homeTeamId][game.seriesNumber].push(game);
    if (homeTeamId !== awayTeamId) {
      teams[awayTeamId][game.seriesNumber].push(game);
    }
  });

  return teams;
};

const formatBySeries = async () => {
  const fullSchedule = await getFullSchedule();
  const teamSchedule = {};

  for (let teamId in fullSchedule) {
    const newTeamSchedule = {};
    for (let i = 1; i < 53; i++) {
      const seriesVariableName = `${i}`;
      newTeamSchedule[seriesVariableName] = [];
    }
    teamSchedule[teamId] = newTeamSchedule;
  }

  for (let teamId in fullSchedule) {
    for (let i = 0; i < fullSchedule[teamId].undefined.length; i++) {
      const game = fullSchedule[teamId].undefined[i];
      const seriesNumber = game.teams.away.seriesNumber;
      if (teamSchedule[teamId][seriesNumber]) {
        teamSchedule[teamId][seriesNumber].push(game);
      }
    }
  }

  return teamSchedule;
};

const fixScheduleErrors = (schedule) => {
  console.log("fixing schedule");
  // loop through each team
  for (var i = 108; i < 158; i++) {
    if (schedule[i] === undefined) {
      continue; // Skip empty objects
    }

    // loop through each series
    for (var j = 1; j < 52; j++) {
      // if series is empty, save to new variable
      if (schedule[i][j].length === 0) {
        const previousSeriesArrayLength = schedule[i][j - 1].length;
        if (schedule[i][j - 1].length > 0) {
          const previousSeriesLength =
            schedule[i][j - 1][previousSeriesArrayLength - 1].seriesGameNumber;

          // check if final game in previous series game.seriesGameNumber is equal to series.length
          if (previousSeriesLength !== previousSeriesArrayLength) {
            // if not, splice that seriesGameNumber.length from previous series into empty series
            schedule[i][j] = schedule[i][j - 1].splice(
              previousSeriesLength,
              previousSeriesArrayLength - previousSeriesLength
            );
          }
          // if seriesGameNumber is equal to series.length, repeat steps for series after empty series

          if (previousSeriesLength === previousSeriesArrayLength) {
            const nextSeriesArrayLength = schedule[i][j + 1].length;
            if (schedule[i][j + 1].length > 0) {
              const nextSeriesLength =
                schedule[i][j + 1][nextSeriesArrayLength - 1].seriesGameNumber;
              if (nextSeriesLength !== nextSeriesArrayLength) {
                // if not, splice that seriesGameNumber.length from previous series into empty series
                schedule[i][j] = schedule[i][j + 1].splice(
                  nextSeriesLength,
                  nextSeriesArrayLength - nextSeriesLength
                );
              }
            }
          }
        }
      }
    }
  }
};

module.exports = { formatBySeries };
