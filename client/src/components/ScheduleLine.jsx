import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

function ScheduleLine({ team, schedule, monthSeries }) {
  const { id } = team;
  console.log(schedule);
  if (!team || schedule.length === 0) {
    return <Spinner />;
  } else {
    return (
      <tr>
        <td>{team.abb}</td>
        <td>{schedule[id][1][0].gameNumber}</td>
      </tr>
    );
  }
}

ScheduleLine.propTypes = {
  team: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired,
  monthSeries: PropTypes.array.isRequired,
};

export default ScheduleLine;
