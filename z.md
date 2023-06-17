One of the passion apps I'm working on is a (<a href='https://sports-app322.herokuapp.com/'>sports betting website</a>). For now it's only baseball, but I hope to eventually get all major sports in there. I've implemented betting and most of the functionality you would expect from a sports website, and the experience has been been the most 'logical gymnastics' heavy experience I've had with coding so far. I've had to do a lot of work to get the data I need in the format I need it in.

My latest challenge is correcting errors in the schedule- for some reason the MLB


const getFullSchedule = async () => {
  const response = await axios.get(
    "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-30&endDate=2023-10-01"
  );
  const res = await response;
  const games = res.data.dates.flatMap((date) => date.games);
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

    for (let series in teamSchedule[teamId]) {
      const seriesNumber = parseInt(series);
      if (teamSchedule[teamId][seriesNumber].length === 1) {
        delete teamSchedule[teamId][seriesNumber];

        // fix keys of following series
        for (let j = seriesNumber + 1; j < 53; j++) {
          const seriesVariableName = `${j}`;
          const newSeriesVariableName = `${j - 1}`;
          teamSchedule[teamId][newSeriesVariableName] =
            teamSchedule[teamId][seriesVariableName];
          delete teamSchedule[teamId][seriesVariableName];
        }
      }
    }
  }

  delete teamSchedule[160];
  delete teamSchedule[159];

  fixScheduleErrors(teamSchedule);

  return teamSchedule;
};

formatBySeries();

const pruneOutMakeUpGames = (schedule) => {
  for (let teamId in schedule) {
    for (let seriesNumber in schedule[teamId]) {
      const series = schedule[teamId][seriesNumber];
      if (series.length === 1) {
        delete schedule[teamId][seriesNumber];
      }
    }
  }
  return schedule;
};



module.exports = { formatBySeries };
