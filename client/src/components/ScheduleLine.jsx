import React from "react";
import PropTypes from "prop-types";
import LineItem from "./LineItem";

function ScheduleLine({ team, schedule, series }) {
  if (!team || schedule.length === 0) {
    return (
      <td key={`${Math.random}`}>
      </td>
    );
  } else {
    return (
      <>
        <td>{team.abb}</td>
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
};

export default ScheduleLine;
