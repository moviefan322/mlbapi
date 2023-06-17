import axios from "axios";
import teamKeysArray from "../utils/teamKeysArray";
import { useEffect, useState } from "react";
import ScheduleLine from "../components/ScheduleLine";
import Spinner from "../components/Spinner";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import monthSeriesMap from "../utils/monthSeriesMap";
import monthMap from "../utils/monthMap";
import formatBySeries from "../utils/formatBySeries";
import { fixScheduleErrors } from "../utils/scheduleCorrection";

function Schedule() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthSeries, setMonthSeries] = useState();
  const [monthName, setMonthName] = useState(monthMap(month));
  const [scoreboard, setScoreboard] = useState([]);
  const [yesterdaysScores, setYesterdaysScores] = useState([]);

  useEffect(() => {
    const getSeasonData = async () => {
      const res = await formatBySeries();
      const cleanedSchedule = fixScheduleErrors(res);
      // const res = await axios.get("/api/odds/schedule");
      const scores = await axios.get("/api/odds/scoreboard");
      setSchedule(cleanedSchedule);
      setScoreboard(scores.data);
      setMonthSeries(monthSeriesMap(month));
      setMonthName(monthMap(month));
      const res2 = await axios.get("/api/odds/yesterdaysScores");
      setYesterdaysScores(res2.data);
      setIsLoading(false);
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

  const nextMonth = () => {
    if (month > 1) {
      setIsLoading(true);
      setMonth(month + 1);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  console.log("schedule", schedule);

  return (
    <>
      <div className="heading-schedule">
        <button
          className={`btn btn-sm ${month === 4 ? "disabled" : ""}`}
          onClick={prevMonth}
          disabled={month === 4}
        >
          <FaLongArrowAltLeft />
        </button>
        <h1>{monthName}</h1>
        <button
          className={`btn btn-sm ${month === 9 ? "disabled" : ""}`}
          onClick={nextMonth}
          disabled={month === 9}
        >
          <FaLongArrowAltRight />
        </button>
      </div>
      <div className="schedule-container">
        <table className="schedule" key={`${Math.random}`}>
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
                  scoreboard={scoreboard}
                  yesterdaysScores={yesterdaysScores}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Schedule;
