import { useEffect, useState } from "react";
import { getTodaysGames } from "../utils/MLBAPI.js";
import SingleGame from "../components/SingleGame.jsx";
import axios from "axios";

function Home() {
  const [games, setGames] = useState([]);
  const [rawOdds, setRawOdds] = useState([]);

  useEffect(() => {
    const fetchOdds = async () => {
      const response = await axios.get("/api/odds");
      if (response.data) {
        setRawOdds(response.data);
        console.log(response.data);
      }
    };
    fetchOdds();
  }, []);

  useEffect(() => {
    getTodaysGames().then((res) => {
      setGames(res);
    });
  }, []);

  return (
    <div id="main" className="card-container">
      {games.map((game, index) => (
        <SingleGame key={index} game={game} odds={rawOdds} />
      ))}
    </div>
  );
}

export default Home;
