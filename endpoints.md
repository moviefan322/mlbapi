player photo:

https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/670541/headshot/67/current

(213x320)

hero:
https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:action:hero:current.jpg/q_auto:good,w_1500/v1/people/670541/action/hero/current




live game data: https://ws.statsapi.mlb.com/api/v1.1/game/718312/feed/live?language=en

fullSeason =
  "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2019-03-28&endDate=2019-09-29";


standings:

https://statsapi.mlb.com/api/v1/standings?leagueId=103&leagueId=104&season=2023&date=2023-05-17&hydrate=division

key moments:

https://bdfed.stitch.mlbinfra.com/bdfed/playMetrics/718142?keyMoments=true&scoringPlays=true&homeRuns=true&strikeouts=true&hardHits=true&highLeverage=false&leadChange=true&winProb=true


video (condensed game!):

https://www.mlb.com/gameday/pirates-vs-tigers/2023/05/17/718142/final/box


???
https://bdfed.stitch.mlbinfra.com/bdfed/spotlight-game/en-US?gamePk=718142


live:

https://ws.statsapi.mlb.com/api/v1.1/game/718142/feed/live?language=en

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