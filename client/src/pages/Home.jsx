import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../features/auth/authSlice.js";
import { getTodaysGames } from "../utils/MLBAPI.js";
import SingleGame from "../components/SingleGame.jsx";
import axios from "axios";

function Home() {
  const [games, setGames] = useState([]);
  const [rawOdds, setRawOdds] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOdds = async () => {
      const response = await axios.get("/api/odds");
      if (response.data) {
        setRawOdds(response.data);
      }
    };
    fetchOdds();
  }, []);

  useEffect(() => {
    dispatch(getUserData(user.token));
    getTodaysGames().then((res) => {
      setGames(res);
    });
  }, []);

  return (
    <div id="main" className="card-container">
      <div className="heading-home">
        <div>
          <h4>Live Scores</h4>
          <h6>(Click on the moneyline to place a bet)</h6>
        </div>
      </div>
      {games.map((game, index) => (
        <SingleGame key={index} game={game} odds={rawOdds} />
      ))}
    </div>
  );
}

export default Home;
