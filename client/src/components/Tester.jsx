// humber perfect:  317942
// high scoring: 718124
import { useEffect, useState } from "react";
import { render2B, renderE, renderRISP, renderTB } from "../utils/boxscore";

function Tester() {
  const [boxscore, setBoxscore] = useState();
  const [loading, setLoading] = useState(true);
  const homeaway = "away";

  useEffect(() => {
    const getSingleGameData = async (gamePk) => {
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1.1/game/317942/feed/live`
      );
      const data = await response.json();
      setBoxscore(data);
      setLoading(false); // Move setLoading inside the function
    };

    getSingleGameData();
  }, []);

  if (loading || !boxscore) {
    return <h1>loading</h1>;
  }
  console.log(boxscore);
  // console.log(boxscore.liveData);

  return (
    <div>
      <p> E: {boxscore.liveData.linescore.teams.home.errors}</p>
      <p> R: {boxscore.liveData.linescore.teams.home.runs}</p>
      <p> H: {boxscore.liveData.linescore.teams.home.hits}</p>
      {render2B(boxscore, homeaway) && (
        <p>2B: {render2B(boxscore, homeaway)}</p>
      )}
      <p> 3B:</p>
      <p> HR:</p>
      <p>SF: </p>
      <p>SB: </p>
      {renderTB(boxscore, homeaway) && (
        <p> TB: {renderTB(boxscore, homeaway)}</p>
      )}
      <p>GIDP: </p>
      <p> RBI:</p>
      <p> 2-out RBI:</p>
      <p>Team LOB:</p>
      {renderRISP(boxscore, homeaway) && (
        <p>Team RISP: {renderRISP(boxscore, homeaway)}</p>
      )}
      <p>----</p>
      <p>DB: </p>
      {renderE(boxscore, homeaway) && <p>E: {renderE(boxscore, homeaway)}</p>}
    </div>
  );
}

export default Tester;
