import React from "react";
import PropTypes from "prop-types";
import Linescore from "./Linescore";

function BattingLinescoreHome({ boxscore }) {

  const pitchers = boxscore.liveData.boxscore.teams[`${homeaway}`].pitchers;

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
        {/* <table className="battingbox">
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
        </table> */}
        <br />
        <Linescore boxscore={boxscore} homeaway={homeaway} />
      </div>
    </>
  );
}

BattingLinescoreHome.propTypes = {
  boxscore: PropTypes.object.isRequired,
};

export default BattingLinescoreHome;
