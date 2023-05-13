import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import PropTypes from "prop-types";
import { formatDate } from "../utils/formatTime";

function BetModal({ open, onClose, teamKeys, odds, game, bettingOn }) {
  const [betAmount, setBetAmount] = useState("");
  const [betError, setBetError] = useState("");
  const { accountBalance } = useSelector((state) => state.auth.user);

  const homeTeam = game.teams.home.team.name;
  const awayTeam = game.teams.away.team.name;

  const onPlaceBet = () => {
    if (betAmount > accountBalance) {
      setBetError("Infuccient funds");
      setTimeout(() => {
        setBetError("");
      }, 3000);
    }
    if (betAmount <= 0) {
      setBetError("Bet amount must be greater than 0");
      setTimeout(() => {
        setBetError("");
      }, 3000);
    }
    if (betAmount > 0 && betAmount <= accountBalance) {
      setBetError("");
      console.log(`Bet placed: ${betAmount} on ${bettingOn}`);
      onClose();
    }
  };

  return (
    <div>
      {game.gameDate.split("T")[1].slice(0, 8) <
      new Date().toString().split(" ")[4] ? (
        <Modal open={open} onClose={onClose} center>
          <h3>Betting is closed for this event</h3>
          <p>
            {" "}
            Bets may not be placed on an event after it has started. Our team is
            working hard to implement live betting, but for now all bets must be
            placed before the event begins.{" "}
          </p>
        </Modal>
      ) : (
        <Modal open={open} onClose={onClose} center>
          <h3>Place a Bet</h3>
          <p>
            {teamKeys[awayTeam].abb}@{teamKeys[homeTeam].abb} on{" "}
            {formatDate(game.gameDate)}
          </p>
          <p>Betting on: {bettingOn}</p>
          <p>Money Line: {odds}</p>
          <div className="flex-row">
            <p>Amount to bet:</p>
            <input
              className="narrow-input"
              type="number"
              name="betAmount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            />{" "}
          </div>{" "}
          <br />
          {betError && (
            <p className="red">
              <strong>{betError}</strong>
            </p>
          )}
          <button className="btn btn-sm btn-block" onClick={onPlaceBet}>
            Place bet
          </button>
        </Modal>
      )}
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
