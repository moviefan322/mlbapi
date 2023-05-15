import PropTypes from "prop-types";
import LineItem from "./LineItem";

function ScheduleLine({ team, schedule, series, scoreboard }) {
  // console.log(schedule[team.id][1][0].calendarEventID.toString().slice(14, 4));
  // console.log(
  //   new Date().toLocaleDateString("en-US").split("/").splice(0, 2).join("-")
  // );

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

  console.log(team.abb, teamPct);

  if (!team || schedule.length === 0) {
    return <td key={`${Math.random}`}></td>;
  } else {
    return (
      <>
        <td className="team-cell">
          <img
            className="icon-scoreboard"
            src={team.image}
            alt=""
            height="35px"
            width="35px"
          />
          {typeof teamPct === "string" ? (
            <span className="pct">{teamPct}</span>
          ) : (
            ""
          )}
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
};

export default ScheduleLine;
