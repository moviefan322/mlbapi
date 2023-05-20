import React, { useEffect } from "react";
import teamKeys from "../utils/teamKeys";
import { formatDate } from "../utils/formatTime";
import PropTypes from "prop-types";

function BetItem({ bet }) {
  const renderBetGame = (gamePlain) => {
    const split = gamePlain.split("@");
    const away = split[0];
    const home = split[1];

    if (away === `${teamKeys[bet.betTeam].abb}`) {
      return (
        <>
          <strong>✔️{teamKeys[bet.betTeam].abb}</strong>@{home}
        </>
      );
    } else {
      return (
        <>
          {away}@<strong>{teamKeys[bet.betTeam].abb}✔️</strong>
        </>
      );
    }
  };

  const renderLine = (line) => {
    if (Number(line) > 0) {
      return `+${line}`;
    } else {
      return line;
    }
  };

  return (
    <div className="bet">
      <div>{bet.gamePlain ? renderBetGame(bet.gamePlain) : bet.gameId}</div>
      <div className="bold">{bet.betAmount}</div>
      <div className="bold">{renderLine(bet.betOdds)}</div>
      <div className={`status status-${bet.betResult}`}>
        {bet.betResult.slice(0, 1).toUpperCase()}
      </div>
      <div className="bold">{bet.plusMinus}</div>
    </div>
  );
}

BetItem.propTypes = {
  bet: PropTypes.object.isRequired,
};

export default BetItem;
