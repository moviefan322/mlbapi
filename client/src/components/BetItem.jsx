import React from "react";
import teamKeys from "../utils/teamKeys";
import { formatDate } from "../utils/formatTime";
import PropTypes from "prop-types";

function BetItem({ bet }) {
  return (
    <div className="bet">
      <div>{formatDate(bet.createdAt)}</div>
      <div>{bet.betPlain}</div>
      <div>
        {bet.betAmount} on {teamKeys[bet.betTeam].abb}
      </div>
      <div>{bet.betOdds}</div>
      <div className={`status status-${bet.betResult}`}>{bet.betResult}</div>
    </div>
  );
}

BetItem.propTypes = {
  bet: PropTypes.object.isRequired,
};

export default BetItem;
