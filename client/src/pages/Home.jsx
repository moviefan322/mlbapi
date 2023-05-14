import { useEffect, useState } from "react";
import { getTodaysGames } from "../utils/MLBAPI.js";
import SingleGame from "../components/SingleGame.jsx";
import axios from "axios";
import { get } from "mongoose";

function Home() {
  const [games, setGames] = useState([]);
  const [rawOdds, setRawOdds] = useState([]);

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
    getTodaysGames().then((res) => {
      setGames(res);
    });
  }, []);

  useEffect(() => {
    const sendResults = async () => {
      const results = await getResults();
      await axios.put("/api/bets/", results);
      console.log("sent");
    };
    sendResults();
  }, [games]);

  console.log("games", games);

  return (
    <div id="main" className="card-container">
      {games.map((game, index) => (
        <SingleGame key={index} game={game} odds={rawOdds} />
      ))}
    </div>
  );
}

export default Home;
