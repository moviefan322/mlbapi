import React from "react";
import PropTypes from "prop-types";
import {
  renderE,
  render2B,
  renderRISP,
  renderTB,
  render3B,
  renderHR,
  renderRBI,
  renderSF,
  render2OutRBI,
  renderDP,
  renderGIDP,
} from "../utils/boxscore";

function Linescore({ boxscore, homeaway }) {
  return (
    <div className="battingbox-bottom">
      {render2B(boxscore, homeaway) && (
        <p>
          <span>2B:</span> {render2B(boxscore, homeaway)}
        </p>
      )}
      {render3B(boxscore, homeaway) && (
        <p>
          {" "}
          <span>3B: </span>
          {render3B(boxscore, homeaway)}
        </p>
      )}
      {renderHR(boxscore, homeaway) && (
        <p>
          {" "}
          <span>HR: </span>
          {renderHR(boxscore, homeaway)}
        </p>
      )}
      {renderSF(boxscore, homeaway) && (
        <p>
          <span>SF: </span>
          {renderSF(boxscore, homeaway)}
        </p>
      )}
      {renderTB(boxscore, homeaway) && (
        <p>
          {" "}
          <span>TB: </span>
          {renderTB(boxscore, homeaway)}
        </p>
      )}
      {renderGIDP(boxscore, homeaway) && (
        <p>
          <span>GIDP: </span>
          {renderGIDP(boxscore, homeaway)}
        </p>
      )}
      {renderRBI(boxscore, homeaway) && (
        <p>
          {" "}
          <span>RBI: </span>
          {renderRBI(boxscore, homeaway)}
        </p>
      )}
      {render2OutRBI(boxscore, homeaway) && (
        <p>
          {" "}
          <span>2-out RBI: </span>
          {render2OutRBI(boxscore, homeaway)}
        </p>
      )}
      {boxscore.liveData.boxscore.teams[`${homeaway}`].teamStats.batting
        .leftOnBase > 0 && (
        <p>
          {" "}
          <span> Team LOB: </span>
          {
            boxscore.liveData.boxscore.teams[`${homeaway}`].teamStats.batting
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
      {(renderDP(boxscore, homeaway) || renderE(boxscore, homeaway)) && (
        <p>
          <span>Fielding</span>
        </p>
      )}
      {renderDP(boxscore, homeaway) && (
        <p>
          <span>DP: </span>
          {renderDP(boxscore, homeaway)}
        </p>
      )}
      {renderE(boxscore, homeaway) && (
        <p>
          <span>E:</span> {renderE(boxscore, homeaway)}
        </p>
      )}
    </div>
  );
}

Linescore.propTypes = {
  boxscore: PropTypes.object.isRequired,
  homeaway: PropTypes.string.isRequired,
};

export default Linescore;
