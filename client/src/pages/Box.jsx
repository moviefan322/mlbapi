import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import teamKeys from "../utils/teamKeys";
import { formatDate4 } from "../utils/formatTime";
import Boxscore from "../components/Boxscore";
import TeamBox from "../components/TeamBox";

function Box() {
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

  console.log(gamePk)


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
        <Boxscore boxscore={boxscore} />
      </div>
      <div className="linescorecontainer">
        <div className="scorescontainer">
          <h3> {boxscore.liveData.boxscore.teams.away.team.name}</h3>
          <TeamBox boxscore={boxscore} homeaway={"away"} />
        </div>
        <div className="scorescontainer">
          <h3> {boxscore.liveData.boxscore.teams.home.team.name}</h3>
          <TeamBox boxscore={boxscore} homeaway={"home"} />
        </div>
        <div className="pitchers"></div>
      </div>
    </>
  );
}

export default Box;
