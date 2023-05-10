import { useEffect, useState } from "react";
import { getTodaysGames } from "../utils/MLBAPI.js";
import { get } from "mongoose";

function Home() {
  const [games, setGames] = useState([]);

  getTodaysGames().then((res) => {
    console.log(res);
  });

  useEffect(() => {
    getTodaysGames().then((res) => {
      setGames(res);
    });
  }, []);

  return (
    <div id="main" className="card-container">
      OmgHi!
    </div>
  );
}

export default Home;
