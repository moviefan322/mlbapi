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

const renderE = (boxscore, homeaway) => {
  let fieldingErrors;
  if (homeaway === "home") {
    fieldingErrors = boxscore.liveData.plays.allPlays.filter(
      (play) =>
        play.result.eventType === "field_error" &&
        play.about.halfInning === "top"
    );
  } else {
    fieldingErrors = boxscore.liveData.plays.allPlays.filter(
      (play) =>
        play.result.eventType === "field_error" &&
        play.about.halfInning === "bottom"
    );
  }
  const fieldingErrorsLine = fieldingErrors
    .map((play) => {
      const playerId = play.runners[0].credits[0].player.id;
      const player =
        boxscore.liveData.boxscore.teams[`${homeaway}`].players[
          `ID${playerId}`
        ].person.fullName.match(/\b(\w+)\b$/)?.[1];
      const errorCount =
        boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${playerId}`]
          .stats.fielding.errors;
      return ` ${player}(${errorCount})`;
    })
    .toString();

  return fieldingErrorsLine;
};

const renderRISP = (boxscore, homeaway) => {
  let runnersOn;
  if (homeaway === "home") {
    runnersOn = boxscore.liveData.plays.allPlays.filter(
      (play) =>
        play.result.type === "atBat" &&
        play.about.halfInning === "bottom" &&
        play.runners.length > 1
    );
  } else {
    runnersOn = boxscore.liveData.plays.allPlays.filter(
      (play) =>
        play.result.type === "atBat" &&
        play.about.halfInning === "top" &&
        play.runners.length > 1
    );
  }

  console.log(runnersOn);

  const RISP = runnersOn.filter((play) => {
    const runner = play.runners.find((runner) => {
      return (
        runner.movement.originBase === "2B" ||
        runner.movement.originBase === "3B"
      );
    });
    return !!runner;
  });

  let runnersOnHits;
  if (homeaway === "home ") {
    runnersOnHits = boxscore.liveData.plays.allPlays.filter(
      (play) =>
        play.result.type === "atBat" &&
        play.about.halfInning === "bottom" &&
        play.runners.length > 1 &&
        (play.result.eventType === "home_run" ||
          play.result.eventType === "single" ||
          play.result.eventType === "double" ||
          play.result.eventType === "triple")
    );
  } else {
    runnersOnHits = boxscore.liveData.plays.allPlays.filter(
      (play) =>
        play.result.type === "atBat" &&
        play.about.halfInning === "top" &&
        play.runners.length > 1 &&
        (play.result.eventType === "home_run" ||
          play.result.eventType === "single" ||
          play.result.eventType === "double" ||
          play.result.eventType === "triple")
    );
  }

  const RISPH = runnersOnHits.filter((play) => {
    const runner = play.runners.find((runner) => {
      return (
        runner.movement.originBase === "2B" ||
        runner.movement.originBase === "3B"
      );
    });
    return !!runner;
  });

  if (RISP.length === 0) {
    return null;
  }

  return `${RISPH.length} for ${RISP.length}`;
};

module.exports = {
  render2B,
  renderE,
  renderRISP,
};
