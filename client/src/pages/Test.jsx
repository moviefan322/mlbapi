import React, { useEffect, useState } from "react";

//5-4 groundout
//(plays).runners,[??-- if .credits is populated?]

const Test = () => {
  const [boxscore, setBoxscore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allPlays, setAllPlays] = useState([]);
  const [battingOrder, setBattingOrder] = useState([]);
  const resultEventType = ["walk", "single", "field_out"];
  const resultevent = ["walk", "single", "groundout"];
  const resultType = ["atBat"];

  const detailsTypeCode = {
    SI: "sinker",
    CH: "changeup",
    CU: "curveball",
    EP: "eephus",
    FA: "fastball",
    FC: "cutter",
    FF: "four-seam fastball",
    FO: "pitchout",
    FS: "splitter",
    FT: "two-seam fastball",
    IN: "intentional ball",
    KC: "knuckle curve",
    KN: "knuckleball",
    PO: "pitchout",
    SC: "screwball",
    SL: "slider",
    UN: "unknown",
  };

  const detailsCallCode = {
    B: "ball",
    C: "called strike",
    X: "in play, out(s)",
  };

  const lineup = {};

  const result = (play) => {
    switch (allPlays[play].result.event) {
      case "Walk":
        return "BB";
      case "Single":
        return "1B";
      default:
        return allPlays[play].result.event;
    }
  };

  useEffect(() => {
    const getBoxscore = async () => {
      let response = () => {
        return new Promise(function (resolve, reject) {
          fetch(`https://statsapi.mlb.com/api/v1.1/game/716529/feed/live`).then(
            (response) => {
              resolve(response);
            }
          );
        });
      };
      let data = await response();
      data = await data.json();
      setAllPlays(data.liveData.plays.allPlays);
      setBoxscore(data);
      setIsLoading(false);
      setBattingOrder(data.liveData.boxscore.teams.away.battingOrder);
    };
    getBoxscore();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const playerName = (id) => {
    return boxscore.liveData.boxscore.teams.away.players[
      `ID${id}`
    ].person.fullName
      .split(" ")
      .splice(1)
      .join(" ");
  };

  const playerNumber = (id) => {
    return boxscore.liveData.boxscore.teams.away.players[`ID${id}`]
      .jerseyNumber;
  };

  const runnerOut = (play, runIndex) => {
    const playRes = [];

    for (let credit in allPlays[`${play}`].runners[`${runIndex}`].credits) {
      if (
        playRes.indexOf(
          allPlays[`${play}`].runners[`${runIndex}`].credits[`${credit}`]
            .position.code
        ) === -1
      ) {
        playRes.push(
          allPlays[`${play}`].runners[`${runIndex}`].credits[`${credit}`]
            .position.code
        );
      }
    }

    return `${playRes.join("-")}@${
      allPlays[`${play}`].runners[`${runIndex}`].movement.outBase
    }`;
  };

//   const handleGroundout = (play) => {
//     const playeId = allPlays[`${play}`].matchup.batter.id;

//     for (let runnerOb in allPlays[`${play}`].runners) {
//       if (runnerOb.details.runner.id === playeId) {
//         return runnerOut(play, runnerOb);
//     }
//   }
// }

  console.log(allPlays[2]);

  //data.liveData.plays.allPlays
  return (
    <table>
      <thead>
        <th>Lineup</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
      </thead>
      <tbody>
        <tr>
          <td>
            {playerNumber(battingOrder[0])}|{playerName(battingOrder[0])}
          </td>
          <td>
            {result(0)}|{runnerOut(1, 3)}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {playerNumber(battingOrder[1])}|{playerName(battingOrder[1])}
          </td>
          <td>
            {result(1)}-{playerNumber(battingOrder[2])}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {playerNumber(battingOrder[2])}|{playerName(battingOrder[2])}
          </td>
          <td>
            {runnerOut(2, 0)}
            {/* {handleGroundout(2)} */}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {playerNumber(battingOrder[3])}|{playerName(battingOrder[3])}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {playerNumber(battingOrder[4])}|{playerName(battingOrder[4])}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {playerNumber(battingOrder[5])}|{playerName(battingOrder[5])}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {playerNumber(battingOrder[6])}|{playerName(battingOrder[6])}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {playerNumber(battingOrder[7])}|{playerName(battingOrder[7])}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {playerNumber(battingOrder[8])}|{playerName(battingOrder[8])}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>R/H</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>E/LOB</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>K/BB</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>S/P</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Test;

// playEvents
// .[index]. isPitch
// .type: "pitch"
// .detals.call.code -
// "C" = called strike
// "B" = ball
// .details.type.code -
// "CH" = changeup

