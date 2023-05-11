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
    for (let i = 1; i < 52; i++) {
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

formatBySeries();

export default formatBySeries;
