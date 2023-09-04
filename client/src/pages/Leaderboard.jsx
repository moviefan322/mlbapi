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

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      {" "}
      <h1>Leaderboard</h1>
      <p>W/T | % | +/-</p>
      <br />
      <table className="leadTable">
        <thead>
          <tr>
            <th className="row1"><span>Name</span></th>
            <th><span>W/T</span></th>
            <th><span>%</span></th>
            <th><span>+/-</span></th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index}>
              <td className="row1">
                {index + 1}. {user.name.split(" ")[0]}{" "}
              </td>{" "}
              <td>
                {user.totalWins}/{user.totalBets}
              </td>
              <td>{parseFloat(user.winPercentage).toFixed(3).slice(1)}</td>
              <td>{user.totalPlusMinus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
