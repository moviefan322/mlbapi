const ordinalSuffix = require("../utils/ordinalSuffix");

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

const renderTB = (boxscore, homeaway) => {
  const batters = getBatters(boxscore, homeaway);
  function calculateTotalBases(boxscore, batter) {
    let basesPerInning = [];
    for (let i = 1; i <= 9; i++) {
      const batterIsOnBase = boxscore.liveData.plays.allPlays.filter((play) => {
        return (
          play.about.inning === i &&
          (play.runners[0]?.details.runner.id === batter ||
            play.runners[1]?.details.runner.id === batter ||
            play.runners[2]?.details.runner.id === batter)
        );
      });
      if (batterIsOnBase.length > 0) {
        const inningBases = batterIsOnBase.reduce((highestValue, play) => {
          let baseValue = 0;
          if (play.runners[0]?.details.runner.id === batter) {
            baseValue = play.runners[0]?.movement.end;
          }
          if (play.runners[1]?.details.runner.id === batter) {
            baseValue = play.runners[1]?.movement.end;
          }
          if (play.runners[2]?.details.runner.id === batter) {
            baseValue = play.runners[2]?.movement.end;
          }
          if (baseValue === "1B") {
            baseValue = 1;
          }
          if (baseValue === "2B") {
            baseValue = 2;
          }
          if (baseValue === "3B") {
            baseValue = 3;
          }
          if (baseValue === "score") {
            baseValue = 4;
          }

          if (baseValue > highestValue) {
            highestValue = baseValue;
          }
          return highestValue;
        }, 0);

        basesPerInning.push(inningBases);
      }
    }

    const totalBases = basesPerInning.reduce((total, inning) => {
      return total + inning;
    }, 0);

    return totalBases;
  }

  const tbLine = batters
    .map((batter) => {
      const TB = calculateTotalBases(boxscore, batter);

      if (TB > 0) {
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            `ID${batter}`
          ].person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${`${player}(${TB})`}`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  return tbLine;
};

const render3B = (boxscore, homeaway) => {
  const batters = getBatters(boxscore, homeaway);
  const tripleLine = batters
    .map((batter) => {
      const triples = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "triple"
      );

      if (triples.length === 1) {
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            "ID" + triples[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${batter}`]
            .seasonStats.batting.triples;
        const pitcher =
          triples[0].matchup.pitcher.fullName.match(/\b(\w+)\b$/)?.[1];
        const lastName = player.person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${lastName}(${dblCount}, ${pitcher})`;
      } else if (triples.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            "ID" + triples[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${batter}`]
            .seasonStats.batting.triples;
        const pitchers = triples.map(
          (matchup) => matchup.pitcher.fullName.match(/\b(\w+)\b$/)?.[1]
        );
        const lastName = player.person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${lastName}(${dblCount}, ${pitchers.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  if (tripleLine.length === 0) {
    return null;
  } else {
    return tripleLine;
  }
};

const renderHR = (boxscore, homeaway) => {
  const batters = getBatters(boxscore, homeaway);
  const hrLine = batters
    .map((batter) => {
      const hrs = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "home_run"
      );

      if (hrs.length === 1) {
        const hrCount =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${batter}`]
            .seasonStats.batting.homeRuns;
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            "ID" + hrs[0].matchup.batter.id
          ];
        const inning = hrs[0].about.inning;
        const pitcher =
          hrs[0].matchup.pitcher.fullName.match(/\b(\w+)\b$/)?.[1];
        const lastName = player.person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${lastName}(${hrCount}, ${ordinalSuffix(inning)}: ${pitcher})`;
      } else if (hrs.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            "ID" + hrs[0].matchup.batter.id
          ];

        const hrCount =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${batter}`]
            .seasonStats.batting.homeRuns;
        const pitchers = hrs.map(
          (hrs) => hrs.matchup.pitcher.fullName.match(/\b(\w+)\b$/)?.[1]
        );
        const inning = hrs.map((hr) => ordinalSuffix(hr.about.inning));
        const combinedArray = inning.map((inningValue, index) => {
          const pitcher = pitchers[index];
          return ` ${inningValue}: ${pitcher}`;
        });
        const lastName = player.person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${lastName}(${hrCount}, ${combinedArray.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  return hrLine;
};

const renderRBI = (boxscore, homeaway) => {
  const batters = getBatters(boxscore, homeaway);
  const rbiLine = batters
    .map((batter) => {
      const rbis =
        boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${batter}`]
          .stats.batting.rbi;
      const player =
        boxscore.liveData.boxscore.teams[`${homeaway}`].players[
          `ID${batter}`
        ].person.fullName.match(/\b(\w+)\b$/)?.[1];

      const seasonTotal =
        boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${batter}`]
          .seasonStats.batting.rbi;

      if (rbis === 0) return null;

      return ` ${player} ${rbis}(${seasonTotal})`;
    })
    .filter((batter) => batter !== null)
    .toString();

  return rbiLine;
};

const renderSF = (boxscore, homeaway) => {
  const batters = getBatters(boxscore, homeaway);
  const sacFlyLine = batters
    .map((batter) => {
      const sacFlys = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "sac_fly"
      );

      if (sacFlys.length === 1) {
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            "ID" + sacFlys[0].matchup.batter.id
          ];
        const pitcher = sacFlys[0].matchup.pitcher.fullName;
        const inning = ordinalSuffix(sacFlys[0].about.inning);
        const lastName = player.person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${lastName}(${inning}:${pitcher})`;
      } else if (sacFlys.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams[`${homeaway}`].players[
            "ID" + sacFlys[0].matchup.batter.id
          ];
        const pitchers = sacFlys.map((matchup) => matchup.pitcher.fullName);
        const lastName = player.person.fullName.match(/\b(\w+)\b$/)?.[1];
        return ` ${lastName}, ${pitchers.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  return sacFlyLine;
};

const render2OutRBI = (boxscore, homeaway) => {
  const batters = getBatters(boxscore, homeaway);
  const twoOutRbiLine = batters
    .map((batter) => {
      const rbis = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.rbi > 0 &&
          play.count.outs === 2
      ).length;

      const player =
        boxscore.liveData.boxscore.teams[`${homeaway}`].players[
          `ID${batter}`
        ].person.fullName.match(/\b(\w+)\b$/)?.[1];

      if (rbis === 0) return null;

      return ` ${player} ${rbis}`;
    })
    .filter((batter) => batter !== null)
    .toString();

  return twoOutRbiLine;
};

const renderDP = (boxscore, homeaway) => {
  let doublePlays;
  if (homeaway === "home") {
    doublePlays = boxscore.liveData.plays.allPlays.filter(
      (play) =>
        play.result.eventType.includes("double_play") &&
        play.about.halfInning === "top"
    );
  } else {
    doublePlays = boxscore.liveData.plays.allPlays.filter(
      (play) =>
        play.result.eventType.includes("double_play") &&
        play.about.halfInning === "bottom"
    );
  }

  const doublePlayLine = doublePlays.map((play) => {
    const credits = play.runners[0].credits;
    const inning = ordinalSuffix(play.about.inning);
    const creditCodes = credits.map((credit) => credit.player.id);
    const playerNames = creditCodes.map((code) => {
      return boxscore.liveData.boxscore.teams[`${homeaway}`].players[
        `ID${code}`
      ].person.fullName.match(/\b(\w+)\b$/)?.[1];
    });

    if (creditCodes.length === 1) {
      return `${playerNames[0]}(${inning})`;
    } else {
      return playerNames.join("-").toString() + `(${inning})`;
    }
  });

  if (doublePlayLine.length === 0) {
    return null;
  } else {
    return doublePlayLine.join(", ");
  }
};

const renderGIDP = (boxscore, homeaway) => {
  const batters = getBatters(boxscore, homeaway);
  const GIDPline = batters
    .map((batter) => {
      const GIDPcount = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "grounded_into_double_play"
      ).length;
      const player =
        boxscore.liveData.boxscore.teams[`${homeaway}`].players[
          `ID${batter}`
        ].person.fullName.match(/\b(\w+)\b$/)?.[1];

      if (GIDPcount > 0) {
        return ` ${player}(${GIDPcount})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  return GIDPline;
};

module.exports = {
  render2B,
  renderE,
  renderRISP,
  renderTB,
  render3B,
  renderHR,
  renderRBI,
  renderSF,
  render2OutRBI,
  renderDP,
  renderGIDP,
};
