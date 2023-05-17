import React from "react";
import PropTypes from "prop-types";
import teamKeys from "../utils/teamKeys";

function Boxscore({ boxscore }) {
  return (
    <div className="box-outline">
      <div className="boxbox">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>R</th>
              <th>H</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <strong>
                  {
                    teamKeys[boxscore.liveData.boxscore.teams.away.team.name]
                      .abb
                  }
                </strong>
              </td>
              {boxscore.liveData.linescore.innings.map((inning, index) => (
                <td key={index}>{inning.away.runs}</td>
              ))}
              <td>{boxscore.liveData.linescore.teams.away.runs}</td>
              <td>{boxscore.liveData.linescore.teams.away.hits}</td>
              <td>{boxscore.liveData.linescore.teams.away.errors}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <strong>
                  {
                    teamKeys[boxscore.liveData.boxscore.teams.home.team.name]
                      .abb
                  }
                </strong>
              </td>
              {boxscore.liveData.linescore.innings.map((inning, index) => (
                <td key={index}>{inning.home.runs}</td>
              ))}
              <td>{boxscore.liveData.linescore.teams.home.runs}</td>
              <td>{boxscore.liveData.linescore.teams.home.hits}</td>
              <td>{boxscore.liveData.linescore.teams.home.errors}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="decision-container">
        <strong className="decision">
          W:{boxscore.liveData.decisions.winner.fullName.match(/\b(\w+)$/)}
        </strong>
        <strong className="decision">
        L: {boxscore.liveData.decisions.loser.fullName.match(/\b(\w+)$/)}
        </strong>
      </div>
    </div>
  );
}

Boxscore.propTypes = {
  boxscore: PropTypes.object.isRequired,
};

export default Boxscore;
