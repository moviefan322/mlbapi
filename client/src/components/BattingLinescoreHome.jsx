import React from "react";
import PropTypes from "prop-types";
import ordinalSuffix from "../utils/ordinalSuffix";
import { renderE, render2B, renderRISP } from "../utils/boxscore";

function BattingLinescoreHome({ boxscore }) {
  const homeBatters = boxscore.liveData.boxscore.teams.home.batters.filter(
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

  const homeaway = "home";

  const homePitchers = boxscore.liveData.boxscore.teams.home.pitchers;

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

  const tbLine = homeBatters
    .map((batter) => {
      const TB = calculateTotalBases(boxscore, batter);
      const player =
        boxscore.liveData.boxscore.teams.home.players[`ID${batter}`].person
          .fullName;

      if (TB > 0) {
        return ` ${`${player}(${TB})`}`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const tripleLine = homeBatters
    .map((batter) => {
      const triples = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "triple"
      );

      if (triples.length === 1) {
        const player =
          boxscore.liveData.boxscore.teams.home.players[
            "ID" + triples[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams.home.players[`ID${batter}`]
            .seasonStats.batting.triples;
        const pitcher = triples[0].matchup.pitcher.fullName;
        const lastName = player.person.fullName;
        return ` ${lastName}(${dblCount}, ${pitcher})`;
      } else if (triples.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams.home.players[
            "ID" + triples[0].matchup.batter.id
          ];
        const dblCount =
          boxscore.liveData.boxscore.teams.home.players[`ID${batter}`]
            .seasonStats.batting.triples;
        const pitchers = triples.map((matchup) => matchup.pitcher.fullName);
        const lastName = player.person.fullName;
        return ` ${lastName}(${dblCount}, ${pitchers.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const hrLine = homeBatters
    .map((batter) => {
      const hrs = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "home_run"
      );

      if (hrs.length === 1) {
        const hrCount =
          boxscore.liveData.boxscore.teams.home.players[`ID${batter}`]
            .seasonStats.batting.homeRuns;
        const player =
          boxscore.liveData.boxscore.teams.home.players[
            "ID" + hrs[0].matchup.batter.id
          ];
        const inning = hrs[0].about.inning;
        const pitcher = hrs[0].matchup.pitcher.fullName;
        const lastName = player.person.fullName;
        return ` ${lastName}(${hrCount}, ${ordinalSuffix(inning)}: ${pitcher})`;
      } else if (hrs.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams.home.players[
            "ID" + hrs[0].matchup.batter.id
          ];

        const hrCount =
          boxscore.liveData.boxscore.teams.home.players[`ID${batter}`]
            .seasonStats.batting.homeRuns;
        const pitchers = hrs.map((hrs) => hrs.matchup.pitcher.fullName);
        const inning = hrs.map((hr) => ordinalSuffix(hr.about.inning));
        const combinedArray = inning.map((inningValue, index) => {
          const pitcher = pitchers[index];
          return `${inningValue}: ${pitcher}`;
        });
        const lastName = player.person.fullName;
        return ` ${lastName}(${hrCount}, ${combinedArray.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const sacFlyLine = homeBatters
    .map((batter) => {
      const sacFlys = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "sac_fly"
      );

      if (sacFlys.length === 1) {
        const player =
          boxscore.liveData.boxscore.teams.home.players[
            "ID" + sacFlys[0].matchup.batter.id
          ];
        const pitcher = sacFlys[0].matchup.pitcher.fullName;
        const inning = ordinalSuffix(sacFlys[0].about.inning);
        const lastName = player.person.fullName;
        return ` ${lastName}(${inning}:${pitcher})`;
      } else if (sacFlys.length > 1) {
        const player =
          boxscore.liveData.boxscore.teams.home.players[
            "ID" + sacFlys[0].matchup.batter.id
          ];
        const pitchers = sacFlys.map((matchup) => matchup.pitcher.fullName);
        const lastName = player.person.fullName;
        return ` ${lastName}, ${pitchers.toString()})`;
      } else {
        return null;
      }
    })
    .filter((batter) => batter !== null)
    .toString();

  const rbiLine = homeBatters
    .map((batter) => {
      const rbis =
        boxscore.liveData.boxscore.teams.home.players[`ID${batter}`].stats
          .batting.rbi;
      const player =
        boxscore.liveData.boxscore.teams.home.players[`ID${batter}`].person
          .fullName;

      const seasonTotal =
        boxscore.liveData.boxscore.teams.home.players[`ID${batter}`].seasonStats
          .batting.rbi;

      if (rbis === 0) return null;

      return ` ${player} ${rbis}(${seasonTotal})`;
    })
    .filter((batter) => batter !== null)
    .toString();

  const twoOutRbiLine = homeBatters
    .map((batter) => {
      const rbis = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.rbi > 0 &&
          play.count.outs === 2
      ).length;

      const player =
        boxscore.liveData.boxscore.teams.home.players[`ID${batter}`].person
          .fullName;

      if (rbis === 0) return null;

      return ` ${player} ${rbis}`;
    })
    .filter((batter) => batter !== null)
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
      return boxscore.liveData.boxscore.teams.home.players[`ID${code}`].person
        .fullName;
    });

    if (creditCodes.length === 1) {
      return `${creditCodes[0]}u`;
    } else {
      return playerNames.join("-").toString();
    }
  });

  const GIDPline = homeBatters
    .map((batter) => {
      const GIDPcount = boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.eventType === "grounded_into_double_play"
      ).length;
      const player =
        boxscore.liveData.boxscore.teams.home.players[`ID${batter}`].person
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
            <th>Batting</th>
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
          {boxscore.liveData.boxscore.teams.home.batters
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
              <tr key={`home-${index}`}>
                <td className="batterName">
                  <span>{`${
                    boxscore.liveData.boxscore.teams.home.players[`ID${batter}`]
                      .jerseyNumber
                  }`}</span>
                  <span>
                    {
                      `${
                        boxscore.liveData.boxscore.teams.home.players[
                          `ID${batter}`
                        ].person.fullName
                      }`.split(" ")[1]
                    }
                  </span>
                  <span>{`${
                    boxscore.liveData.boxscore.teams.home.players[`ID${batter}`]
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
                          boxscore.liveData.boxscore.teams.home.players[
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
                  boxscore.liveData.boxscore.teams.home.players[`ID${batter}`]
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
              {homeBatters.reduce((totalABs, batter) => {
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
              {homeBatters.reduce((totalRuns, batter) => {
                const batterRuns = boxscore.liveData.plays.allPlays.filter(
                  (play) =>
                    play.result.description.includes(
                      `${
                        boxscore.liveData.boxscore.teams.home.players[
                          `ID${batter}`
                        ].person.fullName
                      } scores`
                    )
                ).length;

                return totalRuns + batterRuns;
              }, 0)}
            </td>
            <td>
              {homeBatters.reduce((totalHits, batter) => {
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
              {homeBatters.reduce((totalRBIs, batter) => {
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
              {homeBatters.reduce((totalBBs, batter) => {
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
              {homeBatters.reduce((totalBBs, batter) => {
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
                homeBatters.reduce((teamAvg, batter) => {
                  const batterAvg = parseFloat(
                    boxscore.liveData.boxscore.teams.home.players[`ID${batter}`]
                      .seasonStats.batting.avg
                  );
                  return teamAvg + batterAvg;
                }, 0) / homeBatters.length
              )
                .toFixed(3)
                .toString()
                .substring(1)}
            </td>
          </tr>
        </tfoot>
      </table>
      <br />
      <div className="pitcherstats">
        <table className="battingbox">
          <thead>
            <tr>
              <th>Pitching</th>
              <th>IP</th>
              <th>H</th>
              <th>R</th>
              <th>ER</th>
              <th>BB</th>
              <th>SO</th>
              <th>HR</th>
              <th>HBP</th>
              <th>WP</th>
              <th>BF</th>
              <th>S/P</th>
            </tr>
          </thead>
          <tbody>
            {homePitchers.map((pitcher, index) => (
              <tr key={index}>
                <td className="batterName">
                  <span>{`${
                    boxscore.liveData.boxscore.teams.home.players[
                      `ID${pitcher}`
                    ].jerseyNumber
                  }`}</span>
                  <span>
                    {
                      `${
                        boxscore.liveData.boxscore.teams.home.players[
                          `ID${pitcher}`
                        ].person.fullName
                      }`.split(" ")[1]
                    }
                  </span>
                  <span>{`${
                    boxscore.gameData.players[`ID${pitcher}`].pitchHand.code
                  }`}</span>
                </td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.inningsPitched
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.hits
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.runs
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.earnedRuns
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.baseOnBalls
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.strikeOuts
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.homeRuns
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.hitByPitch
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.wildPitches
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.battersFaced
                }`}</td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.strikes
                }/${
                  boxscore.liveData.boxscore.teams.home.players[`ID${pitcher}`]
                    .stats.pitching.pitchesThrown
                }`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div className="battingbox-bottom">
          {render2B(boxscore, homeaway) && (
            <p>
              <span>2B:</span> {render2B(boxscore, homeaway)}
            </p>
          )}
          {tripleLine.length > 0 && (
            <p>
              <span>3B:</span> {tripleLine}
            </p>
          )}
          {hrLine.length > 0 && (
            <p>
              <span>HR:</span> {hrLine}
            </p>
          )}
          {sacFlyLine.length > 0 && (
            <p>
              <span>SF:</span> {sacFlyLine}
            </p>
          )}
          {tbLine.length > 0 && (
            <p>
              <span>TB:</span> {tbLine}
            </p>
          )}
          {GIDPline.length > 0 && (
            <p>
              <span>GIDP:</span> {GIDPline}
            </p>
          )}
          {rbiLine.length > 0 && (
            <p>
              <span>RBI:</span> {rbiLine}
            </p>
          )}
          {twoOutRbiLine.length > 0 && (
            <p>
              <span>2-out RBI:</span> {twoOutRbiLine}
            </p>
          )}
          {boxscore.liveData.boxscore.teams.home.teamStats.batting.leftOnBase >
            0 && (
            <p>
              {" "}
              <span> Team LOB: </span>
              {
                boxscore.liveData.boxscore.teams.home.teamStats.batting
                  .leftOnBase
              }
            </p>
          )}
          {renderRISP(boxscore, homeaway) && (
            <p>
              <span>Team RISP: </span>
              {renderRISP(boxscore, homeaway)}
            </p>
          )}
          <br />
          {(doublePlayLine.length > 0 || renderE(boxscore, homeaway)) && (
            <p>
              <strong>Fielding</strong>
            </p>
          )}
          {doublePlayLine.length > 0 && (
            <p>
              <span>DP:</span> {doublePlayLine}
            </p>
          )}
          {renderE(boxscore, homeaway) && (
            <p>E: {renderE(boxscore, homeaway)}</p>
          )}
        </div>
      </div>
    </>
  );
}

BattingLinescoreHome.propTypes = {
  boxscore: PropTypes.object.isRequired,
};

export default BattingLinescoreHome;
