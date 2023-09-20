import React, { useEffect, useState } from "react";

const Scorescard = ({ allPlays, battingOrder }) => {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const generateScorecard = (allPlays) => {
      const tempCells = [];
      console.log("generating");
      for (let play in allPlays) {
        if (allPlays[play].about.isTopInning) {
          const inning = allPlays[play].about.inning;
          const event = allPlays[play].result.event;
          const out = allPlays[play].about.hasOut;
          const batterId = allPlays[play].matchup.batter.id;
          const lineUpindex = battingOrder.indexOf(batterId);

          // console.log(inning, event, out, batterId);
          if (lineUpindex === -1) {
            console.log("batter not in lineup");
          } else {
            tempCells.push({ inning, event, out, lineUpindex });
          }
        }
      }
      setCells(tempCells);
    };
    generateScorecard(allPlays);
  }, []);

  const showPlay = (cell, batterIndex, column) => {
    if (batterIndex === cell.lineUpindex) {
      return cell.event;
    } else {
      return;
    }
  };

  console.log(battingOrder);

  return (
    <div>
      POOP
      <table>
        <tbody>
          {battingOrder.map((player, i) => {
            return (
              <tr key={i}>
                <td key={i}>{battingOrder[i]}</td>
                {cells.map((cell, index) => {
                  return <td key={index}>{showPlay(cell, i, i+1)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Scorescard;
