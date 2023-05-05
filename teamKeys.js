const teamKeys = {
  "Chicago Cubs": {
    id: 112,
    abb: "CHC",
    image: "./assets/logos/CHC.png",
  },
  "Cincinnati Reds": {
    id: 113,
    abb: "CIN",
    image: "./assets/logos/CIN.png",
  },
  "Milwaukee Brewers": {
    id: 158,
    abb: "MIL",
    image: "./assets/logos/MIL.png",
  },
  "Pittsburgh Pirates": {
    id: 134,
    abb: "PIT",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Pittsburgh_Pirates_logo_2014.svg/1200px-Pittsburgh_Pirates_logo_2014.svg.png",
  },
  "St. Louis Cardinals": {
    id: 138,
    abb: "STL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/St._Louis_Cardinals_logo.svg/1200px-St._Louis_Cardinals_logo.svg.png",
  },
  "Arizona Diamondbacks": {
    id: 109,
    abb: "ARI",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Arizona_Diamondbacks_logo.svg/1200px-Arizona_Diamondbacks_logo.svg.png",
  },
  "Colorado Rockies": {
    id: 115,
    abb: "COL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Colorado_Rockies_logo.svg/1200px-Colorado_Rockies_logo.svg.png",
  },
  "Los Angeles Dodgers": {
    id: 119,
    abb: "LAD",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Los_Angeles_Dodgers_logo.svg/1200px-Los_Angeles_Dodgers_logo.svg.png",
  },
  "San Diego Padres": {
    id: 135,
    abb: "SD",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/SDPadres_logo.svg/1200px-SDPadres_logo.svg.png",
  },
  "San Francisco Giants": {
    id: 137,
    abb: "SF",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/San_Francisco_Giants_Logo.svg/1200px-San_Francisco_Giants_Logo.svg.png",
  },
  "Baltimore Orioles": {
    id: 110,
    abb: "BAL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Baltimore_Orioles_cap.svg/1200px-Baltimore_Orioles_cap.svg.png",
  },
  "Boston Red Sox": {
    id: 111,
    abb: "BOS",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/RedSoxPrimary_HangingSocks.svg/1200px-RedSoxPrimary_HangingSocks.svg.png",
  },
  "New York Yankees": {
    id: 147,
    abb: "NYY",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/NewYorkYankees_PrimaryLogo.svg/1200px-NewYorkYankees_PrimaryLogo.svg.png",
  },
  "Tampa Bay Rays": {
    id: 139,
    abb: "TB",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Tampa_Bay_Rays.svg/1200px-Tampa_Bay_Rays.svg.png",
  },
  "Toronto Blue Jays": {
    id: 141,
    abb: "TOR",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Toronto_Blue_Jays_logo.svg/1200px-Toronto_Blue_Jays_logo.svg.png",
  },
  "Atlanta Braves": {
    id: 144,
    abb: "ATL",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Atlanta_Braves.svg/1200px-Atlanta_Braves.svg.png",
  },
  "Miami Marlins": {
    id: 146,
    abb: "MIA",
    image: "https://i.imgur.com/37QjW98.png",
  },
  "New York Mets": {
    id: 121,
    abb: "NYM",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/New_York_Mets.svg/1200px-New_York_Mets.svg.png",
  },
  "Philadelphia Phillies": {
    id: 143,
    abb: "PHI",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Philadelphia_Phillies.svg/1200px-Philadelphia_Phillies.svg.png",
  },
  "Washington Nationals": {
    id: 120,
    abb: "WSH",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/washington-nationals-logo-transparent.png",
  },
  "Chicago White Sox": {
    id: 145,
    abb: "CWS",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chicago_White_Sox.svg/1200px-Chicago_White_Sox.svg.png",
  },
  "Cleveland Guardians": {
    id: 114,
    abb: "CLE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Cleveland_Indians_logo.svg/1200px-Cleveland_Indians_logo.svg.png",
  },
  "Detroit Tigers": {
    id: 116,
    abb: "DET",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Detroit_Tigers_logo.svg/1200px-Detroit_Tigers_logo.svg.png",
  },
  "Kansas City Royals": {
    id: 118,
    abb: "KC",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Kansas_City_Royals.svg/1200px-Kansas_City_Royals.svg.png",
  },
  "Minnesota Twins": {
    id: 142,
    abb: "MIN",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Minnesota_Twins_logo_%282010%E2%80%93present%29.svg/1200px-Minnesota_Twins_logo_%282010%E2%80%93present%29.svg.png",
  },
  "Houston Astros": {
    id: 117,
    abb: "HOU",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Houston-Astros-Logo.svg/1200px-Houston-Astros-Logo.svg.png",
  },
  "Los Angeles Angels": {
    id: 108,
    abb: "LAA",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Los_Angeles_Angels_of_Anaheim.svg/1200px-Los_Angeles_Angels_of_Anaheim.svg.png",
  },
  "Oakland Athletics": {
    id: 133,
    abb: "OAK",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Oakland_A%27s_logo.svg/1200px-Oakland_A%27s_logo.svg.png",
  },
  "Seattle Mariners": {
    id: 136,
    abb: "SEA",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Seattle_Mariners_logo.svg/1200px-Seattle_Mariners_logo.svg.png",
  },
  "Texas Rangers": {
    id: 140,
    abb: "TEX",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Texas_Rangers.svg/1200px-Texas_Rangers.svg.png",
  },
};

export default teamKeys;
