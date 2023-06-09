import React from "react";
import PropTypes from "prop-types";
import LineItem from "./LineItem";

function ScheduleLine({
  team,
  schedule,
  series,
  scoreboard,
  yesterdaysScores,
}) {
  const latestGame = scoreboard.find((game) => {
    return (
      game.teams.away.team.id === team.id || game.teams.home.team.id === team.id
    );
  });

  const teamPct = latestGame
    ? latestGame.teams.away.team.id === team.id
      ? latestGame.teams.away.leagueRecord.pct
      : latestGame.teams.home.leagueRecord.pct
    : null;

  const yesterdaysGame = yesterdaysScores.find((game) => {
    return (
      game.teams.away.team.id === team.id || game.teams.home.team.id === team.id
    );
  });

  const yesterdaysTeamPct = yesterdaysGame
    ? yesterdaysGame.teams.away.team.id === team.id
      ? yesterdaysGame.teams.away.leagueRecord.pct
      : yesterdaysGame.teams.home.leagueRecord.pct
    : null;

  if (!team || schedule.length === 0) {
    return <td key={`${Math.random}`}></td>;
  } else {
    return (
      <>
        <td className="team-cell">
          {/* <div>
            {typeof teamPct === "string" ? (
              <span className="pct">{teamPct}</span>
            ) : (
              <span className="pct">{yesterdaysTeamPct}</span>
            )}
          </div> */}
          <div
            style={{
              backgroundImage: `url(${team.image})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "40px",
              width: "40px",
              margin: "5px",
            }}
          ></div>
        </td>
        {series.map((series, index) => (
          <td key={index} className="unit">
            <LineItem
              key={`${index}-${series}${Math.random}`}
              team={team}
              series={series}
              schedule={schedule}
            />
          </td>
        ))}
      </>
    );
  }
}

ScheduleLine.propTypes = {
  team: PropTypes.object.isRequired,
  schedule: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  series: PropTypes.array.isRequired,
  scoreboard: PropTypes.array.isRequired,
  yesterdaysScores: PropTypes.array.isRequired,
};

export default ScheduleLine;
