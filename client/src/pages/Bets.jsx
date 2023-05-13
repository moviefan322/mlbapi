import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBets } from "../features/bet/betSlice";
import BetItem from "../components/BetItem";
import Spinner from "../components/Spinner";

function Bets() {
  const { bets, isLoading } = useSelector((state) => state.bet);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Bets</h1>
      <div className="bets">
        <div className="bet-headings">
          <div>Date</div>
          <div>Game</div>
          <div>Bet</div>
          <div>Result</div>
        </div>
        {bets.map((bet) => (
          <BetItem key={bet._id} bet={bet} />
        ))}
      </div>
    </>
  );
}

export default Bets;
