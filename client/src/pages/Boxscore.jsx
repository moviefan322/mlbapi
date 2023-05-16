import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

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

  return <div>Boxscore for {gamePk}</div>;
}

export default Boxscore;
