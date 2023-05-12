import React from "react";
import teamKeysById from "../utils/teamKeysById";
import Spinner from "./Spinner";

function ScheduleLine({ team }) {
  if (!team) {
    return <Spinner />;
  } else {
    return (
      <tr>
        <td>Poop</td>
      </tr>
    );
  }
}

export default ScheduleLine;
