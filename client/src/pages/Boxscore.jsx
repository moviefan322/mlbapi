import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import teamKeys from "../utils/teamKeys";
import { formatDate4 } from "../utils/formatTime";
import BattingLinescoreAway from "../components/BattingLinescoreAway";
import BattingLinescoreHome from "../components/BattingLinescoreHome";

function Boxscore() {
  const [boxscore, setBoxscore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { gamePk } = useParams();

  useEffect(() => {
    const getBoxscore = async () => {
      let response = () => {
        return new Promise(function (resolve, reject) {
          fetch(
            `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
          ).then((response) => {
            resolve(response);
          });
        });
      };
      let data = await response();
      data = await data.json();
      setBoxscore(data);
      setIsLoading(false);
    };
    getBoxscore();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(boxscore);
  const awayBatters = boxscore.liveData.boxscore.teams.away.batters.filter(
    (batter) =>
      boxscore.liveData.plays.allPlays.filter(
        (play) =>
          play.matchup.batter.id === batter &&
          play.result.type === "atBat" &&
          play.result.eventType !== "sac_fly" &&
          play.result.eventType !== "sac_bunt" &&
          play.result.eventType !== "pickoff_1b" &&
          play.result.eventType !== "pickoff_2b" &&
          play.result.eventType !== "pickoff_3b" &&
          play.result.eventType !== "batter_timeout" &&
          play.result.eventType !== "walk" &&
          play.result.eventType !== "hit_by_pitch"
      ).length > 0
  );

  return (
    <>
      <div className="boxscore-gameinfo">
        <p className="boxscore-daytime">
          {formatDate4(boxscore.gameData.datetime.dateTime)}
          <br />
          {boxscore.gameData.datetime.time}
        </p>
      </div>
      <div className="boxscore-top">
        <div className="top">
          <div>
            <img
              src={
                teamKeys[boxscore.liveData.boxscore.teams.away.team.name].image
              }
              alt="away team logo"
              height="100px"
            />
          </div>
          <div className="textbox textboxaway">
            <p>
              <strong>
                {teamKeys[boxscore.liveData.boxscore.teams.away.team.name].abb}
              </strong>
            </p>
            <p>
              <strong>{boxscore.liveData.linescore.teams.away.runs}</strong>
            </p>
            <p>
              {boxscore.gameData.teams.away.record.leagueRecord.wins}-
              {boxscore.gameData.teams.away.record.leagueRecord.losses}
            </p>
            <p>{boxscore.gameData.teams.away.record.leagueRecord.pct}</p>
          </div>
        </div>
        <div className="top">
          <div>
            <img
              src={
                teamKeys[boxscore.liveData.boxscore.teams.home.team.name].image
              }
              alt="home team logo"
              height="100px"
            />
          </div>
          <div className="textbox">
            <p>
              <strong>
                {teamKeys[boxscore.liveData.boxscore.teams.home.team.name].abb}
              </strong>
            </p>
            <p>
              <strong>{boxscore.liveData.linescore.teams.home.runs}</strong>
            </p>
            <p>
              {boxscore.gameData.teams.home.record.leagueRecord.wins}-
              {boxscore.gameData.teams.home.record.leagueRecord.losses}
            </p>
            <p>{boxscore.gameData.teams.home.record.leagueRecord.pct}</p>
          </div>
        </div>
      </div>
      <div className="box-outline">
        <div className="boxbox">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>R</th>
                <th>H</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {" "}
                  <strong>
                    {
                      teamKeys[boxscore.liveData.boxscore.teams.away.team.name]
                        .abb
                    }
                  </strong>
                </td>
                {boxscore.liveData.linescore.innings.map((inning, index) => (
                  <td key={index}>{inning.away.runs}</td>
                ))}
                <td>{boxscore.liveData.linescore.teams.away.runs}</td>
                <td>{boxscore.liveData.linescore.teams.away.hits}</td>
                <td>{boxscore.liveData.linescore.teams.away.errors}</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <strong>
                    {
                      teamKeys[boxscore.liveData.boxscore.teams.home.team.name]
                        .abb
                    }
                  </strong>
                </td>
                {boxscore.liveData.linescore.innings.map((inning, index) => (
                  <td key={index}>{inning.home.runs}</td>
                ))}
                <td>{boxscore.liveData.linescore.teams.home.runs}</td>
                <td>{boxscore.liveData.linescore.teams.home.hits}</td>
                <td>{boxscore.liveData.linescore.teams.home.errors}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="decision-container">
          <strong className="decision">
            W:{boxscore.liveData.decisions.winner.fullName.match(/\b(\w+)$/)}
          </strong>
          <strong className="decision">
            L:{boxscore.liveData.decisions.loser.fullName.match(/\b(\w+)$/)}
          </strong>
        </div>
      </div>
      <div className="linescorecontainer">
        <div className="scorescontainer">
          <h3> {boxscore.liveData.boxscore.teams.away.team.name}</h3>
          <BattingLinescoreAway boxscore={boxscore} />
        </div>
        <div className="pitchers"></div>
        <div className="scorescontainer">
          <h3> {boxscore.liveData.boxscore.teams.home.team.name}</h3>
          <BattingLinescoreHome boxscore={boxscore} />
        </div>
        <div className="pitchers"></div>
      </div>
    </>
  );
}

export default Boxscore;
