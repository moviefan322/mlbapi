import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import PropTypes from "prop-types";
import { formatDate } from "../utils/formatTime";

function BetModal({ open, onClose, teamKeys, odds, game, bettingOn }) {
  const [betAmount, setBetAmount] = useState("");
  const { accountBalance } = useSelector((state) => state.auth.user);
  console.log(accountBalance);

  const homeTeam = game.teams.home.team.name;
  const awayTeam = game.teams.away.team.name;

  const onPlaceBet = () => {
    // Place bet logic here
  };

  return (
    <div>
      <Modal open={open} onClose={onClose} center>
        <h3>Place a Bet</h3>
        <p>
          {teamKeys[awayTeam].abb}@{teamKeys[homeTeam].abb} on{" "}
          {formatDate(game.gameDate)}
        </p>
        <p>Betting on: {bettingOn}</p>
        <p>Money Line: {odds}</p>
        <div className="flex-row">
          <p>Amount to bet:</p> <input type="number" />{" "}
        </div>{" "}
        <br />
        <button className="btn btn-sm btn-block">Place bet</button>
      </Modal>
    </div>
  );
}

BetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  odds: PropTypes.number.isRequired,
  bettingOn: PropTypes.string.isRequired,
  game: PropTypes.object.isRequired,
};

export default BetModal;
