import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../features/auth/authSlice.js";
import { getTodaysGames } from "../utils/MLBAPI.js";
import SingleGame from "../components/SingleGame.jsx";
import axios from "axios";
import { set } from "mongoose";

function Home() {
  const [games, setGames] = useState([]);
  const [rawOdds, setRawOdds] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOdds = async () => {
      const scoreboard = await axios.get("/api/scoreboard");
      const response = await axios.get("/api/odds");
      if (response.data || scoreboard.data) {
        setRawOdds(response.data);
        setGames(scoreboard.data);
      }
    };
    fetchOdds();
  }, []);

  // useEffect(() => {
  //   getTodaysGames().then((res) => {
  //     setGames(res);
  //   });
  // }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserData(user._id));
    }
  }, [user]);

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
