import React from "react";
import PropTypes from "prop-types";

function PitchingLinescoreAway({ scoreboard }) {
  return (
    <table className="battingbox">
      <thead></thead>
      <tbody></tbody>
    </table>
  );
}

PitchingLinescoreAway.propTypes = {
  scoreboard: PropTypes.object.isRequired,
};
export default PitchingLinescoreAway;
