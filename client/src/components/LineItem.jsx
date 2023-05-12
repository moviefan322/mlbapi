import React from "react";
import PropTypes from "prop-types";
import { formatDate, formatDate2 } from "../utils/formatTime";
import teamKeys from "../utils/teamKeys";
import Spinner from "./Spinner";

function LineItem({ team, series, schedule }) {
  if (!team || schedule.length === 0) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    const { id } = team;
    const seriesNo = series;
    const lastGame = schedule[id][seriesNo]?.length - 1;
    const isHomeTeam =
      teamKeys[schedule[id][seriesNo][0]?.teams.home.team.name]?.abb ===
      team.abb;
    const isAwayTeam = !isHomeTeam;
    let gameResults = [];
    for (let i = 0; i < schedule[id][seriesNo].length; i++) {
      const game = schedule[id][seriesNo][i];
      const isPPD = game.status.detailedState === "Postponed";
      const isWinner =
        (isAwayTeam && game.teams.away.isWinner) ||
        (isHomeTeam && game.teams.home.isWinner);
      const isLoser =
        (isAwayTeam && game.teams.away.isWinner === false) ||
        (isHomeTeam && game.teams.home.isWinner === false);
      const result = isWinner ? (
        <span key={`win-${i}`} className="green">
          W
        </span>
      ) : isLoser ? (
        <span key={`loss-${i}`} className="red">
          L
        </span>
      ) : isPPD ? (
        <span key={`ppd-${i}`} className="small">
          P
        </span>
      ) : (
        <span key={`bullshit-${i}`}></span>
      );
      gameResults.push(result);
      if (i < schedule[id][seriesNo].length - 1) {
        gameResults.push("-");
      }
    }
    return (
      <>
        {formatDate(schedule[id][seriesNo][0]?.officialDate)}-
        {formatDate2(schedule[id][seriesNo][lastGame]?.officialDate)}
        <br />
        {teamKeys[schedule[id][seriesNo][0]?.teams.home.team.name]?.abb ===
        team.abb
          ? `vs.${
              teamKeys[schedule[id][seriesNo][0]?.teams.away.team.name]?.abb
            }`
          : `@${
              teamKeys[schedule[id][seriesNo][0]?.teams.home.team.name]?.abb
            }`}
        <br />
        {gameResults}
      </>
    );
  }
}

LineItem.propTypes = {
  team: PropTypes.object.isRequired,
  schedule: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  series: PropTypes.number.isRequired,
};

export default LineItem;
