import { useState, useEffect } from "react";
import formatBySeries from "../utils/formatBySeries";
import { formatDate } from "../utils/formatTime";
import teamKeysById from "../utils/teamKeysById";
import Spinner from "../components/Spinner";

function Schedule() {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    formatBySeries().then((res) => {
      setSchedule(res);
      setLoading(false);
    });
  }, []);

  if (loading || schedule === null) {
    return <Spinner />;
  }

  if (schedule) {
    const keys = Object.keys(schedule);
    keys.forEach((key) => console.log(key, schedule[key]));
    console.log(teamKeysById);

    

    return (
      <>
        <h1>April</h1>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Series 1</th>
              <th>Series 2</th>
              <th>Series 3</th>
              <th>Series 4</th>
              <th>Series 5</th>
              <th>Series 6</th>
              <th>Series 7</th>
              <th>Series 8</th>
              <th>Series 9</th>
            </tr>
          </thead>
          <tbody id="schedule04"></tbody>
        </table>
        <br />
        <h1>May</h1>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Series 9</th>
              <th>Series 10</th>
              <th>Series 11</th>
              <th>Series 12</th>
              <th>Series 13</th>
              <th>Series 14</th>
              <th>Series 15</th>
              <th>Series 16</th>
              <th>Series 17</th>
              <th>Series 18</th>
            </tr>
          </thead>
          <tbody id="schedule05"></tbody>
        </table>
      </>
    );
  }
}

export default Schedule;
