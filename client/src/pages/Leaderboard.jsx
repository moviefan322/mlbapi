import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/bets/allBets")
      .then((res) => {
        setLeaderboard(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(leaderboard);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {" "}
      <h1>Leaderboard</h1>
      <p>W/T | % | +/-</p>
      <br />
      <ol>
        {leaderboard.map((user, index) => (
          <li key={user._id + Math.random}>
            {index + 1}. {user.name} - {user.totalWins}/{user.totalBets}
            {" | "}
            {parseFloat(user.winPercentage).toFixed(3).slice(1)}
            {" | "}
            {user.totalPlusMinus}
          </li>
        ))}
      </ol>
    </>
  );
}

export default Leaderboard;
