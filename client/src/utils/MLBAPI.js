const getTodaysGames = async () => {
  const response = await fetch(
    `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1`
  );
  const data = await response.json();
  return data.dates[0].games;
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
  return data;
};

module.exports = {
  getTodaysGames,
  getSingleGameData,
  getFullSchedule,
};
