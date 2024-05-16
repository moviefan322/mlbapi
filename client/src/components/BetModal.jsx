import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeBet, reset } from "../features/bet/betSlice";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import PropTypes from "prop-types";
import { formatDate } from "../utils/formatTime";
import { calculateWinnings, calculateBetAmount } from "../utils/moneyLine";
import Spinner from "./Spinner";

function BetModal({ open, onClose, teamKeys, odds, game, bettingOn }) {
  const [error, setError] = useState(null);
  const [confirmBtn, setConfirmBtn] = useState("none");
  const [betBtn, setBetBtn] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [winAmount, setWinAmount] = useState("");
  const [betError, setBetError] = useState("");
  const { accountBalance } = useSelector((state) => state.auth.user);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.bet
  );

  const homeTeam = game.teams.home.team.name;
  const awayTeam = game.teams.away.team.name;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess) {
      dispatch(reset());
      onClose();
    }
  }, [isSuccess, dispatch, navigate, isError, message, onClose]);

  const onPlaceBet = (e) => {
    e.preventDefault();
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
      const gameDate = game.gameDate.split("T")[0];
      const awayId = game.teams.away.team.id;
      const homeId = game.teams.home.team.id;
      const uqId = `${gameDate}${awayId}@${homeId}`;
      setBetError("");
      dispatch(
        placeBet({
          betAmount: Number(betAmount).toFixed(2),
          betOdds: odds,
          betTeam: bettingOn,
          gameId: game.gamePk,
          gamePlain: `${teamKeys[awayTeam].abb}@${teamKeys[homeTeam].abb}`,
          uqId: game.calendarEventId,
        })
      );
    }
  };

  const showConfirm = () => {
    if (betAmount > accountBalance) {
      setBetError("Infuccient funds");
      setTimeout(() => {
        setBetError("");
      }, 3000);
    } else if (betAmount <= 0) {
      setBetError("Bet amount must be greater than 0");
      setTimeout(() => {
        setBetError("");
      }, 3000);
    } else {
      setConfirmBtn("flex");
      setBetBtn("none");
    }
  };

  const hideConfirm = () => {
    setConfirmBtn("none");
    setBetBtn("");
  };

  const handleBetAmountChange = (e) => {
    const newBetAmount = e.target.value;
    setBetAmount(newBetAmount);
    const newWinAmount = calculateWinnings(odds, newBetAmount);
    setWinAmount(newWinAmount);
  };

  const handleWinAmountChange = (e) => {
    const newWinAmount = e.target.value;
    setWinAmount(newWinAmount);
    const newBetAmount = calculateBetAmount(odds, newWinAmount);
    setBetAmount(newBetAmount);
  };

  if (isLoading) {
    return <Spinner />;
  }

  console.log(game.gameDate.split("T")[0]);
  console.log(game.teams.away.team.id);
  console.log(game.teams.home.team.id);

  return (
    <div>
      <Modal open={open} onClose={onClose} center>
        <h3>Place a Bet</h3>
        <p>
          <strong>
            {teamKeys[awayTeam].abb}@{teamKeys[homeTeam].abb}
          </strong>{" "}
          on <strong>{formatDate(game.gameDate)}</strong>
        </p>
        <p>Betting on: {bettingOn}</p>
        <p>Money Line: {odds}</p>
        {confirmBtn === "flex" ? (
          <>
            <div className="flex-row">
              <p>
                Amount to bet: <strong>{betAmount}</strong>
              </p>
            </div>
            <div className="flex-row">
              <p>
                Amount to win: <strong>{winAmount}</strong>
              </p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex-row">
              <p>Amount to bet:</p>
              <input
                className="narrow-input"
                placeholder={0}
                type="number"
                name="betAmount"
                value={betAmount}
                onChange={handleBetAmountChange}
              />
            </div>
            <div className="flex-row">
              <p>
                Amount to win:{" "}
                <input
                  className="narrow-input"
                  placeholder={0}
                  type="number"
                  name="winAmount"
                  onChange={handleWinAmountChange}
                  value={winAmount}
                />
              </p>{" "}
            </div>
          </>
        )}

        <br />
        {betError && (
          <p className="red">
            <strong>{betError}</strong>
          </p>
        )}
        <button
          className={`btn btn-sm btn-block`}
          onClick={showConfirm}
          style={{ display: `${betBtn}` }}
        >
          Place bet
        </button>
        <div className="confirm-cancel" style={{ display: `${confirmBtn}` }}>
          <button className="btn btn-sm  btn-green" onClick={onPlaceBet}>
            Confirm
          </button>
          <button className="btn btn-sm btn-red" onClick={hideConfirm}>
            Cancel
          </button>
        </div>
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
