import formatBySeries from "../utils/formatBySeries";
import teamKeys from "../utils/teamKeys";
import { useEffect, useState } from "react";

function Schedule() {
  const [month, setMonth] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [monthSchedule, setMonthSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    if (month < 10) {
      setMonth("0" + month.toString());
    } else {
      setMonth(month.toString());
    }
  }, []);

  useEffect(() => {
    const getSeasonData = async () => {
      const res = await formatBySeries();
      setSchedule(res);
    };
    getSeasonData();
  }, []);

  console.log(month);

  // useEffect(() => {
  //   for(let team in schedule) {
  //     team.filter((series) => {

  //     });

  //   }
  // }, [schedule]);

  console.log(schedule);

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

export default Schedule;
