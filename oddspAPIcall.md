const options = {
method: "GET",
url: "https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds",
params: {
regions: "us",
oddsFormat: "american",
markets: "h2h,spreads",
dateFormat: "iso",
},
headers: {
"X-RapidAPI-Key": process.env.RAPID_API_KEY,
"X-RapidAPI-Host": "odds.p.rapidapi.com",
},
};


// from SingleGame.jsx
  const thisGame = odds.filter((odd) => {
    return odd.away_team === awayTeam && odd.home_team === homeTeam;
  });
  if (homeTeam === thisGame[0]?.bookmakers[0].markets[0].outcomes[1].name) {
    homeOdds = thisGame[0]?.bookmakers[0].markets[0].outcomes[1].price;
    awayOdds = thisGame[0]?.bookmakers[0].markets[0].outcomes[0].price;
  } else {
    homeOdds = thisGame[0]?.bookmakers[0].markets[0].outcomes[0].price;
    awayOdds = thisGame[0]?.bookmakers[0].markets[0].outcomes[1].price;
  }