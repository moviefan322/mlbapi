import React from "react";
import PropTypes from "prop-types";
import ordinalSuffix from "../utils/ordinalSuffix";

function BattingLinescoreAway({ boxscore }) {
  const awayBatters = boxscore.liveData.boxscore.teams.away.batters.filter(
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

  const awayPitchers = boxscore.liveData.boxscore.teams.away.pitchers;

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

  const doubleLine = awayBatters
    .map((batter) => {
      const doubles = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "double"
      );

      if (doubles.length === 1) {
        const player =
          boxscore.liveData.boxscore.teams.away.players[
            "ID" + doubles[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
            .seasonStats.batting.doubles;
        const pitcher = doubles[0].matchup.pitcher.fullName.split(" ")[1];
        const lastName = player.person.fullName.split(" ")[1];
        return ` ${lastName}(${dblCount}, ${pitcher})`;
      } else if (doubles.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams.away.players[
            "ID" + doubles[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
            .seasonStats.batting.doubles;
        const pitchers = doubles.map(
          (doubles) => doubles.matchup.pitcher.fullName.split(" ")[1]
        );
        const lastName = player.person.fullName.split(" ")[1];
        return ` ${lastName}(${dblCount}, ${pitchers.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const tbLine = awayBatters
    .map((batter) => {
      const TB = calculateTotalBases(boxscore, batter);
      const player =
        boxscore.liveData.boxscore.teams.away.players[
          `ID${batter}`
        ].person.fullName.split(" ")[1];

      if (TB > 0) {
        return ` ${`${player}(${TB})`}`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const tripleLine = awayBatters
    .map((batter) => {
      const triples = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "triple"
      );

      if (triples.length === 1) {
        const player =
          boxscore.liveData.boxscore.teams.away.players[
            "ID" + triples[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
            .seasonStats.batting.triples;
        const pitcher = triples[0].matchup.pitcher.fullName.split(" ")[1];
        const lastName = player.person.fullName.split(" ")[1];
        return ` ${lastName}(${dblCount}, ${pitcher})`;
      } else if (triples.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams.away.players[
            "ID" + triples[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
            .seasonStats.batting.triples;
        const pitchers = triples.map(
          (matchup) => matchup.pitcher.fullName.split(" ")[1]
        );
        const lastName = player.person.fullName.split(" ")[1];
        return ` ${lastName}(${dblCount}, ${pitchers.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const hrLine = awayBatters
    .map((batter) => {
      const hrs = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "home_run"
      );

      if (hrs.length === 1) {
        const hrCount =
          boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
            .seasonStats.batting.homeRuns;
        const player =
          boxscore.liveData.boxscore.teams.away.players[
            "ID" + hrs[0].matchup.batter.id
          ];
        const inning = hrs[0].about.inning;
        const pitcher = hrs[0].matchup.pitcher.fullName.split(" ")[1];
        const lastName = player.person.fullName.split(" ")[1];
        return ` ${lastName}(${hrCount}, ${ordinalSuffix(inning)}: ${pitcher})`;
      } else if (hrs.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams.away.players[
            "ID" + hrs[0].matchup.batter.id
          ];

        const hrCount =
          boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
            .seasonStats.batting.homeRuns;
        const pitchers = hrs.map(
          (hrs) => hrs.matchup.pitcher.fullName.split(" ")[1]
        );
        const inning = hrs.map((hr) => ordinalSuffix(hr.about.inning));
        const combinedArray = inning.map((inningValue, index) => {
          const pitcher = pitchers[index];
          return `${inningValue}: ${pitcher}`;
        });
        const lastName = player.person.fullName.split(" ")[1];
        return ` ${lastName}(${hrCount}, ${combinedArray.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const sacFlyLine = awayBatters
    .map((batter) => {
      const sacFlys = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "sac_fly"
      );

      if (sacFlys.length === 1) {
        const player =
          boxscore.liveData.boxscore.teams.away.players[
            "ID" + sacFlys[0].matchup.batter.id
          ];
        const pitcher = sacFlys[0].matchup.pitcher.fullName.split(" ")[1];
        const inning = ordinalSuffix(sacFlys[0].about.inning);
        const lastName = player.person.fullName.split(" ")[1];
        return ` ${lastName}(${inning}:${pitcher})`;
      } else if (sacFlys.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams.away.players[
            "ID" + sacFlys[0].matchup.batter.id
          ];
        const pitchers = sacFlys.map(
          (matchup) => matchup.pitcher.fullName.split(" ")[1]
        );
        const lastName = player.person.fullName.split(" ")[1];
        return ` ${lastName}, ${pitchers.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const rbiLine = awayBatters
    .map((batter) => {
      const rbis =
        boxscore.liveData.boxscore.teams.away.players[`ID${batter}`].stats
          .batting.rbi;
      const player =
        boxscore.liveData.boxscore.teams.away.players[
          `ID${batter}`
        ].person.fullName.split(" ")[1];

      const seasonTotal =
        boxscore.liveData.boxscore.teams.away.players[`ID${batter}`].seasonStats
          .batting.rbi;

      if (rbis === 0) return null;

      return ` ${player} ${rbis}(${seasonTotal})`;
    })
    .filter((batter) => batter !== null)
    .toString();

  const twoOutRbiLine = awayBatters
    .map((batter) => {
      const rbis = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.rbi > 0 &&
          play.count.outs === 2
      ).length;

      const player =
        boxscore.liveData.boxscore.teams.away.players[
          `ID${batter}`
        ].person.fullName.split(" ")[1];

      if (rbis === 0) return null;

      return ` ${player} ${rbis}`;
    })
    .filter((batter) => batter !== null)
    .toString();

  const RISP = boxscore.liveData.boxscore.teams.away.info[0].fieldList.filter(
    (listitem) => listitem.label.includes("RISP")
  );

  const RISPline =
    RISP[0].value.split("-")[0] + " for " + RISP[0].value.split("-")[2];

  const fieldingErrors = boxscore.liveData.plays.allPlays.filter(
    (play) =>
      play.result.eventType === "field_error" &&
      play.about.halfInning === "bottom"
  );

  const fieldingErrorsLine = fieldingErrors
    .map((play) => {
      const playerId = play.runners[0].credits[0].player.id;
      const player =
        boxscore.liveData.boxscore.teams.away.players[
          `ID${playerId}`
        ].person.fullName.split(" ")[1];
      const errorCount =
        boxscore.liveData.boxscore.teams.away.players[`ID${playerId}`].stats
          .fielding.errors;
      return ` ${player}(${errorCount})`;
    })
    .toString();

  const doublePlays = boxscore.liveData.plays.allPlays.filter(
    (play) =>
      play.result.eventType.includes("double_play") &&
      play.about.halfInning === "bottom"
  );

  const doublePlayLine = doublePlays.map((play) => {
    const credits = play.runners[0].credits;
    const creditCodes = credits.map((credit) => credit.player.id);
    const playerNames = creditCodes.map((code) => {
      return boxscore.liveData.boxscore.teams.away.players[
        `ID${code}`
      ].person.fullName.split(" ")[1];
    });

    if (creditCodes.length === 1) {
      return `${creditCodes[0]}u`;
    } else {
      return playerNames.join("-").toString();
    }
  });

  const GIDPline = awayBatters
    .map((batter) => {
      const GIDPcount = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "grounded_into_double_play"
      ).length;
      const player =
        boxscore.liveData.boxscore.teams.away.players[`ID${batter}`].person
          .fullName;

      if (GIDPcount > 0) {
        return ` ${player}(${GIDPcount})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  return (
    <>
      <table className="battingbox">
        <thead>
          <tr>
            <th></th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>RBI</th>
            <th>BB</th>
            <th>SO</th>
            <th>BA</th>
          </tr>
        </thead>
        <tbody>
          {boxscore.liveData.boxscore.teams.away.batters
            .filter(
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
            )
            .map((batter, index) => (
              <tr key={index}>
                <td className="batterName">
                  <span>{`${
                    boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
                      .jerseyNumber
                  }`}</span>
                  <span>
                    {
                      `${
                        boxscore.liveData.boxscore.teams.away.players[
                          `ID${batter}`
                        ].person.fullName
                      }`.split(" ")[1]
                    }
                  </span>
                  <span>{`${
                    boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
                      .position.abbreviation
                  }`}</span>
                </td>
                <td>
                  {
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
                    ).length
                  }
                </td>
                <td>
                  {" "}
                  {
                    boxscore.liveData.plays.allPlays.filter((play) =>
                      play.result.description.includes(
                        `${
                          boxscore.liveData.boxscore.teams.away.players[
                            `ID${batter}`
                          ].person.fullName
                        } scores`
                      )
                    ).length
                  }
                </td>
                <td>
                  {
                    boxscore.liveData.plays.allPlays.filter(
                      (play) =>
                        play.matchup.batter.id === batter &&
                        (play.result.eventType === "home_run" ||
                          play.result.eventType === "single" ||
                          play.result.eventType === "double" ||
                          play.result.eventType === "triple")
                    ).length
                  }
                </td>
                <td>
                  {" "}
                  {boxscore.liveData.plays.allPlays.reduce(
                    (totalRBIs, play) => {
                      if (
                        play.matchup.batter.id === batter &&
                        play.result.rbi > 0
                      ) {
                        return totalRBIs + play.result.rbi;
                      } else {
                        return totalRBIs;
                      }
                    },
                    0
                  )}
                </td>
                <td>
                  {
                    boxscore.liveData.plays.allPlays.filter(
                      (play) =>
                        play.matchup.batter.id === batter &&
                        play.result.eventType === "walk"
                    ).length
                  }
                </td>
                <td>
                  {
                    boxscore.liveData.plays.allPlays.filter(
                      (play) =>
                        play.matchup.batter.id === batter &&
                        play.result.eventType === "strikeout"
                    ).length
                  }
                </td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
                    .seasonStats.batting.avg
                }`}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Totals:</strong>
            </td>
            <td>
              {" "}
              {awayBatters.reduce((totalABs, batter) => {
                const batterABs = boxscore.liveData.plays.allPlays.filter(
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
                ).length;

                return totalABs + batterABs;
              }, 0)}
            </td>
            <td>
              {awayBatters.reduce((totalRuns, batter) => {
                const batterRuns = boxscore.liveData.plays.allPlays.filter(
                  (play) =>
                    play.result.description.includes(
                      `${
                        boxscore.liveData.boxscore.teams.away.players[
                          `ID${batter}`
                        ].person.fullName
                      } scores`
                    )
                ).length;

                return totalRuns + batterRuns;
              }, 0)}
            </td>
            <td>
              {awayBatters.reduce((totalHits, batter) => {
                const batterHits = boxscore.liveData.plays.allPlays.filter(
                  (play) =>
                    play.matchup.batter.id === batter &&
                    (play.result.eventType === "home_run" ||
                      play.result.eventType === "single" ||
                      play.result.eventType === "double" ||
                      play.result.eventType === "triple")
                ).length;

                return totalHits + batterHits;
              }, 0)}
            </td>
            <td>
              {awayBatters.reduce((totalRBIs, batter) => {
                const batterRBIs = boxscore.liveData.plays.allPlays.reduce(
                  (totalRBIs, play) => {
                    if (
                      play.matchup.batter.id === batter &&
                      play.result.rbi > 0
                    ) {
                      return totalRBIs + play.result.rbi;
                    } else {
                      return totalRBIs;
                    }
                  },
                  0
                );

                return totalRBIs + batterRBIs;
              }, 0)}
            </td>
            <td>
              {" "}
              {awayBatters.reduce((totalBBs, batter) => {
                const batterBBs = boxscore.liveData.plays.allPlays.filter(
                  (play) =>
                    play.matchup.batter.id === batter &&
                    play.result.eventType === "walk"
                ).length;

                return totalBBs + batterBBs;
              }, 0)}
            </td>
            <td>
              {" "}
              {awayBatters.reduce((totalBBs, batter) => {
                const batterBBs = boxscore.liveData.plays.allPlays.filter(
                  (play) =>
                    play.matchup.batter.id === batter &&
                    play.result.eventType === "strikeout"
                ).length;

                return totalBBs + batterBBs;
              }, 0)}
            </td>
            <td>
              {" "}
              {(
                awayBatters.reduce((teamAvg, batter) => {
                  const batterAvg = parseFloat(
                    boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
                      .seasonStats.batting.avg
                  );
                  return teamAvg + batterAvg;
                }, 0) / awayBatters.length
              )
                .toFixed(3)
                .toString()
                .substring(1)}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="battingbox-bottom">
        {doubleLine.length > 0 && <p>2B: {doubleLine}</p>}
        {tripleLine.length > 0 && <p>3B: {tripleLine}</p>}
        {hrLine.length > 0 && <p>HR: {hrLine}</p>}
        {sacFlyLine.length > 0 && <p>SF: {sacFlyLine}</p>}
        {tbLine.length > 0 && <p>TB: {tbLine}</p>}
        {GIDPline.length > 0 && <p>GIDP: {GIDPline}</p>}
        {rbiLine.length > 0 && <p>RBI: {rbiLine}</p>}
        {twoOutRbiLine.length > 0 && <p>2-out RBI: {twoOutRbiLine}</p>}
        {boxscore.liveData.boxscore.teams.away.teamStats.batting.leftOnBase >
          0 && (
          <p>
            {" "}
            Team LOB:
            {boxscore.liveData.boxscore.teams.away.teamStats.batting.leftOnBase}
          </p>
        )}
        {RISPline.length > 0 && (
          <p>
            Team RISP:
            {RISPline}
          </p>
        )}
        <p>
          <strong>Fielding</strong>
        </p>
        {doublePlayLine.length > 0 && <p>DP: {doublePlayLine}</p>}
        {fieldingErrorsLine.length > 0 && <p>E: {fieldingErrorsLine}</p>}
      </div>
      <div className="pitcherstats">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>IP</th>
              <th>H</th>
              <th>R</th>
              <th>ER</th>
              <th>BB</th>
              <th>SO</th>
              <th>HR</th>
              <th>ERA</th>
            </tr>
          </thead>
          <tbody>
            {awayPitchers.map((pitcher) => (
              <td className="batterName">
              <span>{`${
                boxscore.liveData.boxscore.teams.away.players[`ID${pitcher}`]
                  .jerseyNumber
              }`}</span>
              <span>
                {
                  `${
                    boxscore.liveData.boxscore.teams.away.players[
                      `ID${pitcher}`
                    ].person.fullName
                  }`.split(" ")[1]
                }
              </span>
              <span>{`${
                boxscore.gameData.players[`ID${pitcher}`].pitchHand.code
              }`}</span>
            </td>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

BattingLinescoreAway.propTypes = {
  boxscore: PropTypes.object.isRequired,
};

export default BattingLinescoreAway;
