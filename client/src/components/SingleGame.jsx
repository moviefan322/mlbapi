import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import teamKeys from "../utils/teamKeys";
import { getSingleGameData } from "../utils/MLBAPI";
import { formatTime } from "../utils/formatTime";
import Spinner from "./Spinner";

function SingleGame({ game }) {
  const [singleGame, setSingleGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const homeTeam = game.teams.home.team.name;
  const awayTeam = game.teams.away.team.name;

  useEffect(() => {
    getSingleGameData(game.gamePk).then((res) => {
      setSingleGame(res);
      setIsLoading(false);
    });
  }, [game.gamePk]);

  console.log("singleGame", singleGame);

  if (isLoading || singleGame === null) {
    return <Spinner />;
  }

  return (
    <div className="card">
      <h3>
        {teamKeys[awayTeam].abb} ({game.teams.away.leagueRecord.wins} -{" "}
        {game.teams.away.leagueRecord.losses}) @ {teamKeys[homeTeam].abb} (
        {game.teams.home.leagueRecord.wins} -{" "}
        {game.teams.home.leagueRecord.losses})
      </h3>
      <div className="score">
        <img
          class="icon"
          src="../assets/images/logos/${
      keys[awayTeam].abb
    }.png"
          alt=""
        />
        <div class="data">
          <h3>
            {game.status.abstractGameCode === "L" ||
            game.status.abstractGameCode === "F"
              ? `${game.teams.away.score}:${game.teams.home.score}`
              : formatTime(game.gameDate)}
          </h3>
          <h6>
            {game.status.abstractGameCode === "L"
              ? "P: " +
                singleGame.liveData?.plays.currentPlay.matchup.pitcher.fullName
              : ""}
            {game.status.abstractGameCode === "F"
              ? "W: " + singleGame.liveData?.decisions.winner.fullName
              : ""}
          </h6>
          <h6>
            {game.status.abstractGameCode === "L"
              ? "B: " +
                singleGame.liveData?.plays.currentPlay.matchup.batter.fullName
              : ""}
            {game.status.abstractGameCode === "F"
              ? "L: " + singleGame.liveData?.decisions.loser.fullName
              : ""}
          </h6>
        </div>
        <img
          class="icon"
          src="../assets/images/logos/{
      keys[homeTeam].abb
    }.png"
          alt=""
        />
      </div>
      <h4 className="bottom">
        {game.status.abstractGameCode === "L"
          ? `${singleGame.liveData?.linescore.inningHalf} ${singleGame.liveData?.linescore.currentInning}`
          : game.status.abstractGameCode === "F"
          ? "FINAL"
          : `${
              singleGame.gameData?.probablePitchers?.away?.fullName ?? "TBD"
            } vs. ${
              singleGame.gameData?.probablePitchers?.home?.fullName ?? "TBD"
            }`}
      </h4>
    </div>
  );
}

SingleGame.propTypes = {
  game: PropTypes.object.isRequired,
};

export default SingleGame;
