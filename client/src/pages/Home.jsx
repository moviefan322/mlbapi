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

  const getResults = async () => {
    const completedGames = games.filter(
      (game) => game.status.codedGameState === "F"
    );

    let gameResults = [];

    completedGames.forEach((game) => {
      let winner;
      let loser;
      if (game.teams.away.isWinner === true) {
        winner = game.teams.away.team.name;
        loser = game.teams.home.team.name;
      } else {
        winner = game.teams.home.team.name;
        loser = game.teams.away.team.name;
      }
      gameResults.push({
        gameId: game.gamePk,
        winner,
        loser,
      });
    });
    return gameResults;
  };

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

  useEffect(() => {
    const sendResults = async () => {
      const results = await getResults();
      await axios.put("/api/bets/", results);
    };
    sendResults();
  }, [games]);

  return (
    <div id="main" className="card-container">
      {games.map((game, index) => (
        <SingleGame key={index} game={game} odds={rawOdds} />
      ))}
    </div>
  );
}

export default Home;
