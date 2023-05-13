import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import PropTypes from "prop-types";
import teamKeys from "../utils/teamKeys";
import { getSingleGameData } from "../utils/MLBAPI";
import { formatTime, formatDate } from "../utils/formatTime";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import BetModal from "./BetModal";
import Spinner from "./Spinner";

function SingleGame({ game, odds }) {
  const [openAway, setOpenAway] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [singleGame, setSingleGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const homeTeam = game.teams.home.team.name;
  const awayTeam = game.teams.away.team.name;
  let homeOdds = 0;
  let awayOdds = 0;

  useEffect(() => {
    getSingleGameData(game.gamePk).then((res) => {
      setSingleGame(res);
      setIsLoading(false);
    });
  }, [game.gamePk]);

  const onOpenAway = () => setOpenAway(true);
  const onCloseAway = () => setOpenAway(false);
  const onOpenHome = () => setOpenHome(true);
  const onCloseHome = () => setOpenHome(false);

  if (isLoading || singleGame === null) {
    return <Spinner />;
  }

  const thisGame = odds.filter((odd) => {
    return odd.away_team === awayTeam && odd.home_team === homeTeam;
  });
  if (homeTeam === thisGame[0].bookmakers[0].markets[0].outcomes[1].name) {
    homeOdds = thisGame[0].bookmakers[0].markets[0].outcomes[1].price;
    awayOdds = thisGame[0].bookmakers[0].markets[0].outcomes[0].price;
  } else {
    homeOdds = thisGame[0].bookmakers[0].markets[0].outcomes[0].price;
    awayOdds = thisGame[0].bookmakers[0].markets[0].outcomes[1].price;
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
        <div>
          <img className="icon" src={teamKeys[awayTeam].image} alt="" />
          <button
            className={`btn btn-sm ${awayOdds >= 0 ? "red" : "green"}`}
            onClick={onOpenAway}
          >
            {awayOdds >= 0 ? "+" : ""}
            {awayOdds}
          </button>
          {openAway && (
            <BetModal
              open={openAway}
              onClose={onCloseAway}
              teamKeys={teamKeys}
              odds={awayOdds}
              game={game}
              bettingOn={awayTeam}
              animationIn="fadeIn"
              animationOut="fadeOut"
            />
          )}
        </div>
        <div className="data">
          <h3>
            {game.status.abstractGameCode === "L" ||
            game.status.abstractGameCode === "F" ? (
              <>
                {game.teams.away.score} - {game.teams.home.score}
              </>
            ) : (
              formatTime(game.gameDate)
            )}
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
        <div>
          <img className="icon" src={teamKeys[homeTeam].image} alt="" />
          <button
            className={`btn btn-sm ${homeOdds >= 0 ? "red" : "green"}`}
            onClick={onOpenHome}
          >
            {homeOdds >= 0 ? "+" : ""}
            {homeOdds}
          </button>
          {openHome && (
            <BetModal
              open={openHome}
              onClose={onCloseHome}
              teamKeys={teamKeys}
              odds={homeOdds}
              game={game}
              bettingOn={homeTeam}
              animationIn="fadeIn"
              animationOut="fadeOut"
            />
          )}
        </div>
      </div>
      <h4 className="bottom">
        {game.status.abstractGameCode === "L" ? (
          <>
            {singleGame.liveData?.linescore.balls}-
            {singleGame.liveData?.linescore.strikes}{" "}
            {singleGame.liveData?.linescore.outs}{" "}
            {singleGame.liveData?.linescore.outs === 1 ? "out" : "outs"}{" "}
            {singleGame.liveData?.linescore.inningHalf === "Top" ? (
              <AiOutlineArrowUp />
            ) : (
              <AiOutlineArrowDown />
            )}
            {singleGame.liveData?.linescore.currentInning}
          </>
        ) : game.status.abstractGameCode === "F" ? (
          "FINAL"
        ) : (
          `${
            singleGame.gameData?.probablePitchers.away?.fullName ?? "TBD"
          } vs. ${
            singleGame.gameData?.probablePitchers.home?.fullName ?? "TBD"
          }`
        )}
      </h4>
    </div>
  );
}

SingleGame.propTypes = {
  game: PropTypes.object.isRequired,
  odds: PropTypes.array.isRequired,
};

export default SingleGame;
