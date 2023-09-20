import React, { useEffect, useState } from "react";

const Scorescard = ({ allPlays, battingOrder }) => {
  const [cells, setCells] = useState([]);

  const inningsTotal = allPlays[allPlays.length - 1].about.inning;

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

  const showPlay = (cell, column, emptyRows = null) => {
    return cell.event;
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

  const two = batterFilter(0);

  const generateRows = (batIndx) => {
    console.log("generating!");
    const row = [];
    const filteredCells = batterFilter(batIndx);
    for (let inn = 1; inn < inningsTotal; inn++) {
      const isPlay = filteredCells.filter((cell) => cell.inning === inn);
      console.log(isPlay);
      if (isPlay.length === 0) {
        row.push(<td key={inn}>-</td>);
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
            console.log("Bat order", batIndex);
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
