import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../features/auth/authSlice.js";
import { formatDate } from "../utils/formatTime";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
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
  const { user } = useSelector((state) => state.auth);

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
    setGames(prevDayGames.data);
    setDay(prevDay);
    setGamesLoading(false);
  };

  const fetchNextDaysGames = async () => {
    const nextDay = new Date(day.getTime() + 24 * 60 * 60 * 1000);
    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const day2 = String(nextDay.getDate()).padStart(2, "0");
    const query = `${year}-${month}-${day2}`;
    setGamesLoading(true);
    const nextDayGames = await axios.get(`/api/odds/${query}`);
    setGames(nextDayGames.data);
    setDay(nextDay);
    setGamesLoading(false);
  };

  if (gamesLoading || day === null || !games) {
    return <Spinner />;
  }

  return (
    <>
      <div className="heading-home">
        <div className="btn-head">
          <button className="btn" onClick={() => fetchPrevDaysGames()}>
            <FaLongArrowAltLeft />
          </button>
        </div>
        <div>
          {formatDate(today) === formatDate(day) ? (
            <h4>Live Scores</h4>
          ) : (
            <h5>Games from {formatDate(day)}</h5>
          )}
          <h6>(Click on the moneyline to place a bet)</h6>
        </div>
        <button className="btn" onClick={() => fetchNextDaysGames()}>
          <FaLongArrowAltRight />
        </button>
      </div>
      <div id="main" className="card-container">
        {games.map((game, index) => (
          <SingleGame
            key={index}
            game={game}
            odds={rawOdds}
            user={user}
            today={formatDate(today) === formatDate(day)}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
