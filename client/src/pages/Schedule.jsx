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
      setIsLoading(false);  
    };
    getSeasonData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>May</h1>
      <table key={`${Math.random}`}>
        <thead>
          <tr>
            <th>Team</th>
            <th>Ser.9</th>
            <th>Ser.10</th>
            <th>Ser.11</th>
            <th>Ser.12</th>
            <th>Ser.13</th>
            <th>Ser.14</th>
            <th>Ser.15</th>
            <th>Ser.16</th>
            <th>Ser.17</th>
            <th>Ser.18</th>
          </tr>
        </thead>
        <tbody>
          {teamKeysArray.map((team, index) => (
            <tr key={`${Math.random}-${index}`}>
              <ScheduleLine
                key={`${Math.random}`}
                team={team}
                schedule={schedule}
                series={monthSeries}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Schedule;
