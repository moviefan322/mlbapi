import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../features/auth/authSlice.js";
import { formatDate } from "../utils/formatTime";
import Spinner from "../components/Spinner.jsx";
import SingleGame from "../components/SingleGame.jsx";
import axios from "axios";

axios.defaults.headers.common["accepts"] = `application/json
`;

function Home() {
  const [games, setGames] = useState(null);
  const [gamesLoading, setGamesLoading] = useState(false);
  const [day, setDay] = useState(null);
  const [rawOdds, setRawOdds] = useState([]);
  const { user, isLoading } = useSelector((state) => state.auth);

  const today = new Date().toString();

  useEffect(() => {
    setDay(new Date());
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOdds = async () => {
      const scoreboard = await axios.get("/api/odds/scoreboard");
      const response = await axios.get("/api/odds");
      if (response.data) {
        setRawOdds(response.data);
        // console.log(response.data);
        setGames(scoreboard.data);
      }
    };
    fetchOdds();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserData(user._id));
    }
  }, []);

  const fetchPrevDaysGames = async () => {
    const prevDay = new Date(day.getTime() - 24 * 60 * 60 * 1000);
    const year = prevDay.getFullYear();
    const month = String(prevDay.getMonth() + 1).padStart(2, "0");
    const day2 = String(prevDay.getDate()).padStart(2, "0");
    const query = `${year}-${month}-${day2}`;
    setGamesLoading(true);
    const prevDayGames = await axios.get(`/api/odds/${query}`);
    console.log(prevDayGames.data);
    setGames(prevDayGames.data);
    setDay(prevDay);
    setGamesLoading(false);
  };

  if (gamesLoading || day === null || games === null) {
    return <Spinner />;
  }

  const prevDay = new Date(day.getTime() - 24 * 60 * 60 * 1000);
  const year = prevDay.getFullYear();
  const month = String(prevDay.getMonth() + 1).padStart(2, "0");
  const day2 = String(prevDay.getDate()).padStart(2, "0");
  const query = `${year}-${month}-${day2}`;

  console.log(games);

  return (
    <>
      <div className="heading-home">
        <div>
          {today === day ? (
            <h4>Live Scores</h4>
          ) : (
            <h5>Games from {formatDate(day)}</h5>
          )}
          <h6>(Click on the moneyline to place a bet)</h6>
          <button onClick={() => fetchPrevDaysGames()}>
            Games from{" "}
            {formatDate(new Date(day.getTime() - 24 * 60 * 60 * 1000))}
          </button>
          <button></button>
        </div>
      </div>
      <div id="main" className="card-container">
        {games.map((game, index) => (
          <SingleGame key={index} game={game} odds={rawOdds} />
        ))}
      </div>
    </>
  );
}

export default Home;
