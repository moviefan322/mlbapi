// humber perfect:  317942
// high scoring: 718124
import { useEffect, useState } from "react";
import { render2B } from "../utils/boxscore";

function Tester() {
  const [boxscore, setBoxscore] = useState();
  const [loading, setLoading] = useState(true);
  const homeaway = "home";

  useEffect(() => {
    const getSingleGameData = async (gamePk) => {
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1.1/game/718124/feed/live`
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

  const homeBatters = boxscore.liveData.boxscore.teams.home.batters.filter(
    (batter) =>
      boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.type === "atBat" &&
          play.result.eventType !== "sac_fly" &&
          play.result.eventType !== "sac_bunt" &&
          play.result.eventType !== "pickoff_1b" &&
          play.result.eventType !== "pickoff_2b" &&
          play.result.eventType !== "pickoff_3b" &&
          play.result.eventType !== "batter_timeout" &&
          play.result.eventType !== "walk" &&
          play.result.eventType !== "hit_by_pitch"
      ).length > 0
  );

  const fieldingErrors = boxscore.liveData.plays.allPlays.filter(
    (play) =>
      play.result.eventType === "field_error" && play.about.halfInning === "top"
  );

  console.log(fieldingErrors);

  const fieldingErrorsLine = fieldingErrors
    .map((play) => {
      const playerId = play.runners[0].credits[0].player.id;
      console.log(playerId);
      const player =
        boxscore.liveData.boxscore.teams.home.players[
          `ID${playerId}`
        ].person.fullName.match(/\b(\w+)\b$/)?.[1];
      const errorCount =
        boxscore.liveData.boxscore.teams.home.players[`ID${playerId}`].stats
          .fielding.errors;
      return ` ${player}(${errorCount})`;
    })
    .toString();

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
      <p> TB:</p>
      <p>GIDP: </p>
      <p> RBI:</p>
      <p> 2-out RBI:</p>
      <p>Team LOB:</p>
      <p>Team RISP:</p>
      <p>----</p>
      <p>DB: </p>
      {fieldingErrorsLine && <p>E: {fieldingErrorsLine}</p>}
    </div>
  );
}

export default Tester;
