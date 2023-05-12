import formatBySeries from "../utils/formatBySeries";
import teamKeysArray from "../utils/teamKeysArray";
import { useEffect, useState } from "react";
import ScheduleLine from "../components/ScheduleLine";
import Spinner from "../components/Spinner";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import monthSeriesMap from "../utils/monthSeriesMap";
import monthMap from "../utils/monthMap";

function Schedule() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthSeries, setMonthSeries] = useState();
  const [monthName, setMonthName] = useState(monthMap(month));

  useEffect(() => {
    const getSeasonData = async () => {
      const res = await formatBySeries();
      setSchedule(JSON.parse(JSON.stringify(res)));
      setMonthSeries(monthSeriesMap(month));
      setMonthName(monthMap(month));
      setIsLoading(false);
      console.log(monthSeriesMap(month));
    };
    getSeasonData();
  }, [month]);

  const prevMonth = () => {
    if (month > 1) {
      setIsLoading(true);
      setMonth(month - 1);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="header">
        <button
          className="btn btn-sm"
          onClick={prevMonth}
          disabled={month === 4}
        >
          <FaLongArrowAltLeft /> Prev
        </button>
        <h1>{monthName}</h1>
        <button className="btn btn-sm">
          <FaLongArrowAltRight /> Next
        </button>
      </div>

      <table key={`${Math.random}`}>
        <thead>
          <tr>
            <th>Team</th>
            {monthSeries.map((series, index) => (
              <th key={`${index}-${series}${Math.random}`}>Ser.{series}</th>
            ))}
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
