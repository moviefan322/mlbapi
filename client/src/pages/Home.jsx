import { useEffect, useState } from "react";
import { getTodaysGames, getSingleGameData } from "../utils/MLBAPI.js";
import SingleGame from "../components/SingleGame.jsx";

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getTodaysGames().then((res) => {
      setGames(res);
    });
  }, []);

  return (
    <div id="main" className="card-container">
      {games.map((game, index) => (
        <SingleGame
          key={index}
          game={game}
        />
      ))}
    </div>
  );
}

export default Home;
