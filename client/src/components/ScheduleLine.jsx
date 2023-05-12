import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import LineItem from "./LineItem";

function ScheduleLine({ team, schedule, series }) {
  const { id } = team;
  if (!team || schedule.length === 0) {
    return (
      <tr>
        <Spinner />
      </tr>
    );
  } else {
    return (
      <>
        <td>{team.abb}</td>
        {series.map((series, index) => (
          <td key={index} className="unit">
            {" "}
            <LineItem
              key={index}
              team={team}
              series={series}
              schedule={schedule}
            />{" "}
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
};

export default ScheduleLine;
