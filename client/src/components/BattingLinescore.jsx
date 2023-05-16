import React from "react";
import PropTypes from "prop-types";

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
                    boxscore.liveData.boxscore.teams.away.players[
                      "ID" + `${batter}`
                    ].jerseyNumber
                  }`}</span>
                  <span>
                    {
                      `${
                        boxscore.liveData.boxscore.teams.away.players[
                          "ID" + `${batter}`
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
                            "ID" + `${batter}`
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
                          "ID" + `${batter}`
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
        </tbody>
      </table>
    </>
  );
}

BattingLinescoreAway.propTypes = {
  boxscore: PropTypes.object.isRequired,
};

export default BattingLinescoreAway;
