import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const Scorescard = ({ allPlays, battingOrder }) => {
  const [cells, setCells] = useState([]);
  const [loading, setLoading] = useState(true);

  const inningsTotal = allPlays[allPlays.length - 1].about.inning;

  useEffect(() => {
    const generateScorecard = (allPlays) => {
      const tempCells = [];
      for (let play in allPlays) {
        if (allPlays[play].about.isTopInning) {
          const inning = allPlays[play].about.inning;
          const event = allPlays[play].result.event;
          const out = allPlays[play].about.hasOut;
          const batterId = allPlays[play].matchup.batter.id;
          const lineUpindex = battingOrder.indexOf(batterId);
          const playIndex = play;

          if (lineUpindex === -1) {
            // console.log("batter not in lineup");
            // WRITE CODE HERE
          } else {
            tempCells.push({ inning, event, out, lineUpindex, playIndex });
          }
        }
      }
      setCells(tempCells);
      setLoading(false);
    };
    generateScorecard(allPlays);
  }, []);

  if (loading) return <Spinner />;

  const showPlay = (cell, column, emptyRows = null) => {
    switch (cell.event) {
      case "Walk":
        return "1:BB";
      case "Single":
        return "1: 1b";
      case "Groundout":
        return handleGroundout(allPlays[cell.playIndex]);
      case "Strikeout":
        if (strikeOut(allPlays[cell.playIndex]) === "Swinging Strike") {
          return "0: lk;";
        }
        return "0: K";
      case "Double":
        return "2: 2b";
      case "Sac Fly":
        return "0: SF" + returnCode(allPlays[cell.playIndex], "Sac Fly");
      case "Home Run":
        return "4: HR";
      case "Flyout":
        return "0: F" + returnCode(allPlays[cell.playIndex], "Flyout");
      case "Lineout":
        return "0: L" + returnCode(allPlays[cell.playIndex], "Lineout");
      case "Intent Walk":
        return "1: IBB";
      case "Pop Out":
        return "0: P" + returnCode(allPlays[cell.playIndex], "Pop Out");
      // case "Grounded Into DP":
      //   console.log(allPlays[cell.playIndex]);
      // case "Fielders Choice Out":
        //
        // return "1: FC" + handleGroundout(allPlays[cell.playIndex])
      default:
        return cell.event;
    }
  };

  const returnCode = (play, event) => {
    const code = play.runners.filter((runner) => {
      if(event === "Grounded Into DP") {

      }
     else if(runner.details.event === event && runner.credits.length > 0) {
        return runner.credits[0].position.code;
      } else {
        return "404 code"
      }
    });
    return code[0].credits[0].position.code
  };


  const strikeOut = (play) => {
    return play.playEvents[play.playEvents.length - 1].details.description;
  };

  const runnerOut = (play, runIndex) => {
    const playRes = [];

    for (let credit in play.runners[`${runIndex}`].credits) {
  
      if (
        playRes.indexOf(
          play.runners[`${runIndex}`].credits[`${credit}`].position.code
        ) === -1
      ) {
        playRes.push(
          play.runners[`${runIndex}`].credits[`${credit}`].position.code
        );
      }
    }
    return `${play.runners[`${runIndex}`].movement.outBase[0]}:${playRes.join(
      "-"
    )}`;
  };

  const handleGroundout = (play) => {
    const playerId = play.matchup.batter.id;

    for (let runnerOb in play.runners) {
      if (play.runners[runnerOb].details?.runner?.id === playerId) {
        return runnerOut(play, runnerOb);
      }
    }
  };

  const batterFilter = (index) => {
    let thisList = [];
    cells.filter((cell) => {
      if (index === cell.lineUpindex) {
        thisList.push(cell);
      }
    });
    return thisList;
  };

  const generateRows = (batIndx) => {
    const row = [];
    const filteredCells = batterFilter(batIndx);
    for (let inn = 1; inn <= inningsTotal; inn++) {
      const isPlay = filteredCells.filter((cell) => cell.inning === inn);
      if (isPlay.length === 0) {
        row.push(<td key={inn}></td>);
      } else {
        row.push(<td key={inn}>{showPlay(isPlay[0])}</td>);
      }
    }
    return row;
  };

  return (
    <div>
      POOP
      <table>
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody className="testbody">
          {battingOrder.map((player, batIndex) => {
            return (
              <tr key={batIndex}>
                <td>{battingOrder[batIndex]}</td>
                {generateRows(batIndex)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Scorescard;
