import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBets, reset } from "../features/bet/betSlice";
import { getUserData } from "../features/auth/authSlice";
import getGameResults from "../utils/gameResults";
import BetItem from "../components/BetItem";
import Spinner from "../components/Spinner";

function Bets() {
  const [updatedBets, setUpdatedBets] = useState(false);
  const { bets, isLoading } = useSelector((state) => state.bet);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendResults = async () => {
      const results = await getGameResults();
      await axios.put("/api/bets/", results);
    };
    sendResults();
    dispatch(reset());
    dispatch(getBets());
    dispatch(getUserData(user.token));
    setUpdatedBets(true);
  }, []);

  if (isLoading || !updatedBets) {
    return <Spinner />;
  }

  return (
    <>
      {bets.length === 0 ? (
        <h4>No bets placed yet</h4>
      ) : (
        <>
          {" "}
          <h1>Bets</h1>
          <div className="bets">
            <div className="bet-headings">
              <div>Date</div>
              <div>Game</div>
              <div>Bet</div>
              <div>Line</div>
              <div>Result</div>
              <div>+/</div>
            </div>
            {bets.map((bet) => (
              <BetItem key={bet._id} bet={bet} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Bets;
