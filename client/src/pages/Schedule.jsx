import formatBySeries from "../utils/formatBySeries";
import teamKeysArray from "../utils/teamKeysArray";
import { useEffect, useState } from "react";
import ScheduleLine from "../components/ScheduleLine";
import Spinner from "../components/Spinner";

function Schedule() {
  // const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const monthSeries = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  useEffect(() => {
    const getSeasonData = async () => {
      const res = await formatBySeries();
      setSchedule(JSON.parse(JSON.stringify(res)));
    };
    getSeasonData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
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
          {teamKeysArray.map((team, index) => (
            <ScheduleLine
              key={index}
              team={team}
              schedule={schedule}
              series={monthSeries}
            />
          ))}
        </thead>
        <tbody id="schedule05"></tbody>
      </table>
    </>
  );
}

export default Schedule;
