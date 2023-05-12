import React from "react";
import Spinner from "./Spinner";
import teamKeys from "../utils/teamKeys";
import { formatDate } from "../utils/formatTime";

function ScheduleLine({ team, schedule, series }) {
  const { id } = team;
  if (!team || schedule.length === 0) {
    return (
      <tr>
        <Spinner />
      </tr>
    );
  } else {
    console.log(schedule);
    return (
      <tr>
        <td>{team.abb}</td>
        <td>
          {formatDate(schedule[id][1][0].officialDate)}-
          {formatDate(schedule[id][1][2].officialDate)}
          <br />
          {teamKeys[schedule[id][1][0].teams.home.team.name].abb === team.abb
            ? `vs.${teamKeys[schedule[id][1][0].teams.away.team.name].abb}`
            : `@${teamKeys[schedule[id][1][0].teams.home.team.name].abb}`}
        </td>
      </tr>
    );
  }
}

export default ScheduleLine;
