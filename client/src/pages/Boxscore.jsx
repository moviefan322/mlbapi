import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import teamKeys from "../utils/teamKeys";
import { formatDate4 } from "../utils/formatTime";

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

  console.log(boxscore);

  if (isLoading) {
    return <Spinner />;
  }

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
            W:{boxscore.liveData.decisions.winner.fullName.split(" ")[1]}
          </strong>
          <strong className="decision">
            L:{boxscore.liveData.decisions.loser.fullName.split(" ")[1]}
          </strong>
        </div>
      </div>
      <h3> {teamKeys[boxscore.liveData.boxscore.teams.away.team.name].abb}</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>RBI</th>
            <th>BB</th>
            <th>SO</th>
            <th>BA</th>
          </tr>
        </thead>
        <tbody>
          {boxscore.liveData.boxscore.teams.away.batters
            .filter(
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
            )
            .map((batter, index) => (
              <tr key={index}>
                <td className="batterName">
                  <span>{`${
                    boxscore.liveData.boxscore.teams.away.players[
                      "ID" + `${batter}`
                    ].jerseyNumber
                  }`}</span>
                  <span>
                    {
                      `${
                        boxscore.liveData.boxscore.teams.away.players[
                          "ID" + `${batter}`
                        ].person.fullName
                      }`.split(" ")[1]
                    }
                  </span>
                  <span>{`${
                    boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
                      .position.abbreviation
                  }`}</span>
                </td>
                <td>
                  {
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
                    ).length
                  }
                </td>
                <td>
                  {" "}
                  {
                    boxscore.liveData.plays.allPlays.filter((play) =>
                      play.result.description.includes(
                        `${
                          boxscore.liveData.boxscore.teams.away.players[
                            "ID" + `${batter}`
                          ].person.fullName
                        } scores`
                      )
                    ).length
                  }
                </td>
                <td>
                  {
                    boxscore.liveData.plays.allPlays.filter(
                      (play) =>
                        play.matchup.batter.id === batter &&
                        (play.result.eventType === "home_run" ||
                          play.result.eventType === "single" ||
                          play.result.eventType === "double" ||
                          play.result.eventType === "triple")
                    ).length
                  }
                </td>
                <td>
                  {" "}
                  {boxscore.liveData.plays.allPlays.reduce(
                    (totalRBIs, play) => {
                      if (
                        play.matchup.batter.id === batter &&
                        play.result.rbi > 0
                      ) {
                        return totalRBIs + play.result.rbi;
                      } else {
                        return totalRBIs;
                      }
                    },
                    0
                  )}
                </td>
                <td>
                  {
                    boxscore.liveData.plays.allPlays.filter(
                      (play) =>
                        play.matchup.batter.id === batter &&
                        play.result.eventType === "walk"
                    ).length
                  }
                </td>
                <td>
                  {
                    boxscore.liveData.plays.allPlays.filter(
                      (play) =>
                        play.matchup.batter.id === batter &&
                        play.result.eventType === "strikeout"
                    ).length
                  }
                </td>
                <td>{`${
                  boxscore.liveData.boxscore.teams.away.players[`ID${batter}`]
                    .seasonStats.batting.avg
                }`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Boxscore;
