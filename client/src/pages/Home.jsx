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
  const [day, setDay] = useState(null);
  const [prevDay, setPrevDay] = useState();
  const [rawOdds, setRawOdds] = useState([]);
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    setDay(new Date());
  }, []);

  console.log(day);

  const dispatch = useDispatch();

  const fetchPrevDaysGames = async () => {
    console.log("poop")
  }

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

  if (isLoading || day === null || games === null) {
    return <Spinner />;
  }

  return (
    <>
      <div className="heading-home">
        <div>
          <h4>Live Scores</h4>
          <h6>(Click on the moneyline to place a bet)</h6>
          <button
            classname="heading-schedule-btn"
            onClick={() =>
              setDay(new Date(day.getTime() - 24 * 60 * 60 * 1000))
            }
          >
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
