const teamKeys = {
  "Chicago Cubs": {
    abbreviation: "CHC",
    image: "./assets/logos/CHC.png",
  },
  "Cincinnati Reds": {
    abbreviation: "CIN",
    image: "./assets/logos/CIN.png",
  },
  "Milwaukee Brewers": {
    abbreviation: "MIL",
    image: "./assets/logos/MIL.png",
  },
  "Pittsburgh Pirates": {
    abbreviation: "PIT",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Pittsburgh_Pirates_logo_2014.svg/1200px-Pittsburgh_Pirates_logo_2014.svg.png",
  },
  "St. Louis Cardinals": {
    abbreviation: "STL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/St._Louis_Cardinals_logo.svg/1200px-St._Louis_Cardinals_logo.svg.png",
  },
  "Arizona Diamondbacks": {
    abbreviation: "ARI",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Arizona_Diamondbacks_logo.svg/1200px-Arizona_Diamondbacks_logo.svg.png",
  },
  "Colorado Rockies": {
    abbreviation: "COL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Colorado_Rockies_logo.svg/1200px-Colorado_Rockies_logo.svg.png",
  },
  "Los Angeles Dodgers": {
    abbreviation: "LAD",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Los_Angeles_Dodgers_logo.svg/1200px-Los_Angeles_Dodgers_logo.svg.png",
  },
  "San Diego Padres": {
    abbreviation: "SD",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/SDPadres_logo.svg/1200px-SDPadres_logo.svg.png",
  },
  "San Francisco Giants": {
    abbreviation: "SF",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/San_Francisco_Giants_Logo.svg/1200px-San_Francisco_Giants_Logo.svg.png",
  },
  "Baltimore Orioles": {
    abbreviation: "BAL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Baltimore_Orioles_cap.svg/1200px-Baltimore_Orioles_cap.svg.png",
  },
  "Boston Red Sox": {
    abbreviation: "BOS",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/RedSoxPrimary_HangingSocks.svg/1200px-RedSoxPrimary_HangingSocks.svg.png",
  },
  "New York Yankees": {
    abbreviation: "NYY",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/NewYorkYankees_PrimaryLogo.svg/1200px-NewYorkYankees_PrimaryLogo.svg.png",
  },
  "Tampa Bay Rays": {
    abbreviation: "TB",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Tampa_Bay_Rays.svg/1200px-Tampa_Bay_Rays.svg.png",
  },
  "Toronto Blue Jays": {
    abbreviation: "TOR",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Toronto_Blue_Jays_logo.svg/1200px-Toronto_Blue_Jays_logo.svg.png",
  },
  "Atlanta Braves": {
    abbreviation: "ATL",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Atlanta_Braves.svg/1200px-Atlanta_Braves.svg.png",
  },
  "Miami Marlins": {
    abbreviation: "MIA",
    image: "https://i.imgur.com/37QjW98.png",
  },
  "New York Mets": {
    abbreviation: "NYM",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/New_York_Mets.svg/1200px-New_York_Mets.svg.png",
  },
  "Philadelphia Phillies": {
    abbreviation: "PHI",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Philadelphia_Phillies.svg/1200px-Philadelphia_Phillies.svg.png",
  },
  "Washington Nationals": {
    abbreviation: "WSH",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/washington-nationals-logo-transparent.png",
  },
  "Chicago White Sox": {
    abbreviation: "CWS",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chicago_White_Sox.svg/1200px-Chicago_White_Sox.svg.png",
  },
  "Cleveland Indians": {
    abbreviation: "CLE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Cleveland_Indians_logo.svg/1200px-Cleveland_Indians_logo.svg.png",
  },
  "Detroit Tigers": {
    abbreviation: "DET",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Detroit_Tigers_logo.svg/1200px-Detroit_Tigers_logo.svg.png",
  },
  "Kansas City Royals": {
    abbreviation: "KC",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Kansas_City_Royals.svg/1200px-Kansas_City_Royals.svg.png",
  },
  "Minnesota Twins": {
    abbreviation: "MIN",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Minnesota_Twins_logo_%282010%E2%80%93present%29.svg/1200px-Minnesota_Twins_logo_%282010%E2%80%93present%29.svg.png",
  },
  "Houston Astros": {
    abbreviation: "HOU",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Houston-Astros-Logo.svg/1200px-Houston-Astros-Logo.svg.png",
  },
  "Los Angeles Angels": {
    abbreviation: "LAA",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Los_Angeles_Angels_of_Anaheim.svg/1200px-Los_Angeles_Angels_of_Anaheim.svg.png",
  },
  "Oakland Athletics": {
    abbreviation: "OAK",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Oakland_A%27s_logo.svg/1200px-Oakland_A%27s_logo.svg.png",
  },
  "Seattle Mariners": {
    abbreviation: "SEA",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Seattle_Mariners_logo.svg/1200px-Seattle_Mariners_logo.svg.png",
  },
  "Texas Rangers": {
    abbreviation: "TEX",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Texas_Rangers.svg/1200px-Texas_Rangers.svg.png",
  },
};

export default teamKeys;
