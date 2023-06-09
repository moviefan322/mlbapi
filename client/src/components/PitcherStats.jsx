import React from "react";
import PropTypes from "prop-types";

function PitcherStats({ boxscore, homeaway }) {
  const pitchers = boxscore.liveData.boxscore.teams[`${homeaway}`].pitchers;

  const displayName = (pitcher) => {
    const rawName =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .person.fullName;

    return rawName.split(" ").slice(1).join(" ");
  };

  let totalIP = 0;
  pitchers.forEach((pitcher) => {
    const pitcherID = `ID${pitcher}`;
    const inningsPitchedString =
      boxscore.liveData.boxscore.teams[homeaway].players[pitcherID].stats
        .pitching.inningsPitched;

    // Splitting the inningsPitchedString by the decimal point
    const [wholeInnings, partialInnings] = inningsPitchedString.split(".");

    let inningsPitched = parseInt(wholeInnings); // Parsing the whole innings

    // Handling fractional parts and converting to desired format
    if (partialInnings) {
      if (partialInnings === "1") {
        inningsPitched += 1 / 3;
      } else if (partialInnings === "2") {
        inningsPitched += 2 / 3;
      }
    }

    totalIP += inningsPitched;
  });

  let totalHits = 0;
  pitchers.forEach((pitcher) => {
    const hits =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.hits;

    totalHits += hits;
  });

  let totalRuns = 0;
  pitchers.forEach((pitcher) => {
    const runs =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.runs;

    totalRuns += runs;
  });

  let totalEarnedRuns = 0;
  pitchers.forEach((pitcher) => {
    const earnedRuns =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.earnedRuns;

    totalEarnedRuns += earnedRuns;
  });

  let totalBB = 0;
  pitchers.forEach((pitcher) => {
    const BB =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.baseOnBalls;

    totalBB += BB;
  });

  let totalKs = 0;
  pitchers.forEach((pitcher) => {
    const K =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.strikeOuts;

    totalKs += K;
  });

  let totalHRs = 0;
  pitchers.forEach((pitcher) => {
    const HR =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.homeRuns;

    totalHRs += HR;
  });

  let totalHBPs = 0;
  pitchers.forEach((pitcher) => {
    const HBP =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.hitByPitch;

    totalHBPs += HBP;
  });

  let totalWPs = 0;
  pitchers.forEach((pitcher) => {
    const WP =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.wildPitches;

    totalWPs += WP;
  });

  let TBF = 0;
  pitchers.forEach((pitcher) => {
    const BF =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.battersFaced;

    TBF += BF;
  });

  let totalStrikes = 0;
  pitchers.forEach((pitcher) => {
    const strikes =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.strikes;

    if (!strikes) {
      const pitcherIndex = pitchers.indexOf(pitcher);
      pitchers.splice(pitcherIndex, 1);
    }

    totalStrikes += strikes;
  });

  let totalPitchesThrown = 0;
  pitchers.forEach((pitcher) => {
    const pitchesThrown =
      boxscore.liveData.boxscore.teams[`${homeaway}`].players[`ID${pitcher}`]
        .stats.pitching.pitchesThrown;

    totalPitchesThrown += pitchesThrown;
  });

  return (
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
        {pitchers.map((pitcher, index) => (
          <tr key={index}>
            <td className="batterName">
              <span>
                {`${
                  boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                    `ID${pitcher}`
                  ].jerseyNumber
                }` !== "undefined"
                  ? `${
                      boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                        `ID${pitcher}`
                      ].jerseyNumber
                    }`
                  : "-"}
              </span>
              <span>
                {
                  `${
                  displayName(pitcher)
                  }`
                }
              </span>
              <span>{`${
                boxscore.gameData.players[`ID${pitcher}`].pitchHand.code
              }`}</span>
            </td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.inningsPitched
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.hits
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.runs
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.earnedRuns
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.baseOnBalls
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.strikeOuts
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.homeRuns
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.hitByPitch
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.wildPitches
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.battersFaced
            }`}</td>
            <td>{`${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.strikes
            }/${
              boxscore.liveData.boxscore.teams[`${homeaway}`].players[
                `ID${pitcher}`
              ].stats.pitching.pitchesThrown
            }`}</td>
          </tr>
        ))}
        <tr>
          <td>
            <strong>Totals:</strong>
          </td>
          <td>{Math.ceil(totalIP)}</td>
          <td>{totalHits}</td>
          <td>{totalRuns}</td>
          <td>{totalEarnedRuns}</td>
          <td>{totalBB}</td>
          <td>{totalKs}</td>
          <td>{totalHRs}</td>
          <td>{totalHBPs}</td>
          <td>{totalWPs}</td>
          <td>{TBF}</td>
          <td>
            {totalStrikes}/{totalPitchesThrown}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PitcherStats.propTypes = {
  boxscore: PropTypes.object.isRequired,
  homeaway: PropTypes.string.isRequired,
};
export default PitcherStats;
