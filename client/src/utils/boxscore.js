const getBatters = (boxscore, homeaway) => {
  const batters = boxscore.liveData.boxscore.teams[
    `${homeaway}`
  ].batters.filter(
    (batter) =>
      boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.type === "atBat" &&
          play.result.eventType !== "sac_fly" &&
          play.result.eventType !== "sac_bunt" &&
          play.result.eventType !== "pickoff_1b" &&
          play.result.eventType !== "pickoff_2b" &&
          play.result.eventType !== "pickoff_3b" &&
          play.result.eventType !== "batter_timeout" &&
          play.result.eventType !== "walk" &&
          play.result.eventType !== "hit_by_pitch"
      ).length > 0
  );

  return batters;
};

const render2B = (boxscore, homeaway) => {
  const batters = getBatters(boxscore, homeaway);

  const doubleLine = batters
    .map((batter) => {
      const doubles = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "double"
      );

      if (doubles.length === 1) {
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            "ID" + doubles[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${batter}`]
            .seasonStats.batting.doubles;
        const pitcher =
          doubles[0].matchup.pitcher.fullName.match(/\b(\w+)\b$/)?.[1];
        const lastName = player.person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${lastName}(${dblCount}, ${pitcher})`;
      } else if (doubles.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            "ID" + doubles[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${batter}`]
            .seasonStats.batting.doubles;
        const pitchers = doubles.map(
          (doubles) => doubles.matchup.pitcher.fullName.match(/\b(\w+)\b$/)?.[1]
        );
        const lastName = player.person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${lastName}(${dblCount}, ${pitchers.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  return doubleLine;
};

module.exports = {
  render2B,
};
