import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBets, reset } from "../features/bet/betSlice";
import { getUserData } from "../features/auth/authSlice";
import BetItem from "../components/BetItem";
import Spinner from "../components/Spinner";
import { formatShortDate } from "../utils/formatTime";

function Bets() {
  const [updatedBets, setUpdatedBets] = useState(false);
  const { bets, isLoading } = useSelector((state) => state.bet);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getBets());
    dispatch(getUserData(user.token));
    setUpdatedBets(true);
  }, []);

  if (isLoading || !updatedBets) {
    return <Spinner />;
  }

  // Sort bets by creation date
  const uniqueDays = [
    ...new Set(bets.map((bet) => bet.createdAt.split("T")[0])),
  ];

  console.log(uniqueDays);

  return (
    <>
      {bets.length === 0 ? (
        <h4>No bets placed yet</h4>
      ) : (
        <>
          <h1>Bets</h1>
          <div className="bets-container">
            <div className="bet-headings">
              <div>Game</div>
              <div>Bet</div>
              <div>Line</div>
              <div>Result</div>
              <div>+/</div>
            </div>
            <div>
              {uniqueDays.map((day) => (
                <div key={day}>
                  <p>{formatShortDate(day)}</p>
                  {bets
                    .filter((bet) => bet.createdAt.split("T")[0] === day)
                    .map((bet) => (
                      <div key={bet._id}>
                        <BetItem bet={bet} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Bets;
