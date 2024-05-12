import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import PropTypes from "prop-types";
import teamKeys from "../utils/teamKeys";
import { getSingleGameData } from "../utils/MLBAPI";
import { formatTime, formatShortDate2 } from "../utils/formatTime";
import { Link } from "react-router-dom";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { reset } from "../features/bet/betSlice";
import { useDispatch } from "react-redux";
import Boxscore from "./Boxscore";
import renderOnBaseImage from "../utils/baserunners";
import BetModal from "./BetModal";
import Spinner from "./Spinner";

function SingleGame({ game, odds, user, today }) {
  const [openAway, setOpenAway] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [singleGame, setSingleGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const homeTeam = game.teams.home.team.name;
  const awayTeam = game.teams.away.team.name;
  const generateOdds = (awayAvg, homeAvg) => {
    let homeOdds = 0;
    let awayOdds = 0;

    const avgDifference = awayAvg - homeAvg;

    if (awayAvg > homeAvg) {
      awayOdds = Math.ceil(100 * (-1 * (2 - awayAvg / 2 - avgDifference)));
      homeOdds = Math.ceil(100 * (2 + homeAvg / 2 - avgDifference));
    } else {
      awayOdds = Math.ceil(100 * (2 + awayAvg / 2 - avgDifference));
      homeOdds = Math.ceil(100 * (-1 * (2 - homeAvg / 2 - avgDifference)));
    }

    return {
      awayOdds,
      homeOdds,
    };
  };

  const { awayOdds, homeOdds } = generateOdds(
    game.teams.away.leagueRecord.pct,
    game.teams.home.leagueRecord.pct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getSingleGameData(game.gamePk).then((res) => {
      setSingleGame(res);
      setIsLoading(false);
    });
  }, [game.gamePk]);

  const onOpenAway = () => {
    setOpenAway(true);
    dispatch(reset());
  };
  const onCloseAway = () => setOpenAway(false);
  const onOpenHome = () => {
    setOpenHome(true);
    dispatch(reset());
  };
  const onCloseHome = () => setOpenHome(false);

  if (isLoading || singleGame === null) {
    return <Spinner />;
  }

  // const showData = async () => {
  //   const singleGameData = await getSingleGameData(717678);
  //   console.log(singleGameData);
  // };

  const awayStarterId = singleGame.gameData?.probablePitchers.away?.id;
  const homeStarterId = singleGame.gameData?.probablePitchers.home?.id;

  const awayStarterStats =
    singleGame.liveData.boxscore.teams.away.players[`ID${awayStarterId}`]
      ?.seasonStats.pitching;
  const homeStarterStats =
    singleGame.liveData.boxscore.teams.home.players[`ID${homeStarterId}`]
      ?.seasonStats.pitching;

  if (game.seriesDescription === "All-Star Game") {
    return (
      <div className="card">
        <p>All Star Game</p>
      </div>
    );
  }

  return (
    <div className="card">
      <p>
        Game {game.seriesGameNumber}/{game.gamesInSeries}
      </p>
      <div className="cardteams">
        <div className="cardteam">
          <h2>{teamKeys[awayTeam].abb}</h2>
          <p>{game.teams.away.leagueRecord.pct}</p>
          <p>
            ({game.teams.away.leagueRecord.wins}-
            {game.teams.away.leagueRecord.losses})
          </p>
        </div>{" "}
        <div className="icon-odds">
          <div
            className="icon"
            style={{
              backgroundImage: `url(https://midfield.mlbstatic.com/v1/team/${teamKeys[awayTeam].id}/spots/64)`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "60px",
              width: "60px",
            }}
          ></div>
          {awayOdds && today && (
            <div className="tooltip">
              <button
                className={`btn btn-sm ${awayOdds >= 0 ? "red" : "green"}`}
                onClick={user && onOpenAway}
                disabled={
                  !(
                    game.status.codedGameState === "S" ||
                    game.status.codedGameState === "P" ||
                    game.status.codedGameState === "PW"
                  )
                }
              >
                {awayOdds >= 0 ? "+" : ""}
                {awayOdds}
              </button>
              {!user && (
                <span className="tooltiptext">
                  You must be logged in to place a bet
                </span>
              )}
              {!(
                game.status.codedGameState === "S" ||
                game.status.codedGameState === "P" ||
                game.status.codedGameState === "PW"
              ) && (
                <span className="tooltiptext">
                  Betting is closed at first pitch
                </span>
              )}
            </div>
          )}
          {openAway && (
            <BetModal
              open={openAway}
              onClose={onCloseAway}
              teamKeys={teamKeys}
              odds={awayOdds}
              game={game}
              bettingOn={awayTeam}
              animationIn="fadeIn"
              animationOut="fadeOut"
            />
          )}
        </div>
        <h1>@</h1>{" "}
        <div className="icon-odds">
          <div
            className="icon"
            style={{
              backgroundImage: `url(https://midfield.mlbstatic.com/v1/team/${teamKeys[homeTeam].id}/spots/64)`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "60px",
              width: "60px",
            }}
          ></div>
          <div>
            {homeOdds && today && (
              <div className="tooltip">
                <button
                  className={`bet-btn btn btn-sm ${
                    homeOdds >= 0 ? "red" : "green"
                  }`}
                  onClick={user && onOpenHome}
                  // disabled={
                  //   !(
                  //     game.status.codedGameState === "S" ||
                  //     game.status.codedGameState === "P" ||
                  //     game.status.codedGameState === "PW"
                  //   )
                  // }
                >
                  {homeOdds >= 0 ? "+" : ""}
                  {homeOdds}
                </button>
                {!user && (
                  <span className="tooltiptext">
                    You must be logged in to place a bet
                  </span>
                )}
                {!(
                  game.status.codedGameState === "S" ||
                  game.status.codedGameState === "P" ||
                  game.status.codedGameState === "PW"
                ) && (
                  <span className="tooltiptext">
                    Betting is closed at first pitch
                  </span>
                )}
              </div>
            )}
          </div>

          {openHome && (
            <BetModal
              open={openHome}
              onClose={onCloseHome}
              teamKeys={teamKeys}
              odds={homeOdds}
              game={game}
              bettingOn={homeTeam}
              animationIn="fadeIn"
              animationOut="fadeOut"
            />
          )}
        </div>
        <div className="cardteam">
          <h2>{teamKeys[homeTeam].abb}</h2>
          <p>{game.teams.home.leagueRecord.pct}</p>
          <p>
            ({game.teams.home.leagueRecord.wins}-
            {game.teams.home.leagueRecord.losses})
          </p>
        </div>
      </div>
      <div className="score">
        <div className="data">
          {game.status.statusCode === "I" ||
          game.status.codedGameState === "O" ||
          game.status.codedGameState === "F" ? (
            <>
              <strong>
                {singleGame.liveData.linescore.teams.away.runs} -{" "}
                {singleGame.liveData.linescore.teams.home.runs}
              </strong>
            </>
          ) : game.status.codedGameState === "D" ? (
            <div>
              <h4>PPD</h4>
            </div>
          ) : game.status.statusCode === "PW" ? (
            <div className="data-preview">
              {singleGame.gameData.probablePitchers.away ? (
                <div className="pitch-preview-contianer">
                  <div className="cardteam2">
                    <p>
                      <strong>
                        #
                        {
                          singleGame.liveData.boxscore.teams.away.players[
                            `ID${awayStarterId}`
                          ].jerseyNumber
                        }
                      </strong>
                    </p>
                    <p>
                      {awayStarterStats.wins}-{awayStarterStats.losses}
                    </p>
                    <p>{awayStarterStats.era}</p>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.gameData?.probablePitchers.away?.id}/headshot/67/current)`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "68px",
                      border: "1px solid black",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>
              ) : (
                <div className="pitch-preview-contianer">
                  <div className="cardteam2">
                    <p>
                      <strong>???</strong>
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.gameData?.probablePitchers.away?.id}/headshot/67/current)`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "68px",
                      border: "1px solid black",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>
              )}

              <h3 style={{ margin: "2rem" }}>WARMUP </h3>
              <div className="pitch-preview-contianer">
                {singleGame.gameData.probablePitchers.home ? (
                  <>
                    <div
                      style={{
                        backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.gameData?.probablePitchers.home?.id}/headshot/67/current)`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        height: "100px",
                        width: "68px",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div className="cardteam2">
                      {singleGame.liveData.boxscore.teams.home.players[
                        `ID${homeStarterId}`
                      ] ? (
                        <>
                          <p>
                            <strong>
                              #
                              {
                                singleGame.liveData.boxscore.teams.home.players[
                                  `ID${homeStarterId}`
                                ]?.jerseyNumber
                              }
                            </strong>
                          </p>
                          <p>
                            {homeStarterStats?.wins}-{homeStarterStats?.losses}
                          </p>
                          <p>{homeStarterStats?.era}</p>
                        </>
                      ) : (
                        <p>
                          <strong>???</strong>
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="pitch-preview-contianer">
                    <div
                      style={{
                        backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.gameData?.probablePitchers.home?.id}/headshot/67/current)`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        height: "100px",
                        width: "68px",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div className="cardteam2">
                      <p>
                        <strong>???</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="data-preview">
              {singleGame.gameData.probablePitchers.away ? (
                <div className="pitch-preview-contianer">
                  <div className="cardteam2">
                    <p>
                      <strong>
                        #
                        {
                          singleGame.liveData.boxscore.teams.away.players[
                            `ID${awayStarterId}`
                          ].jerseyNumber
                        }
                      </strong>
                    </p>
                    <p>
                      {awayStarterStats.wins}-{awayStarterStats.losses}
                    </p>
                    <p>{awayStarterStats.era}</p>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.gameData?.probablePitchers.away?.id}/headshot/67/current)`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "68px",
                      border: "1px solid black",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>
              ) : (
                <div className="pitch-preview-contianer">
                  <div className="cardteam2">
                    <p>
                      <strong>???</strong>
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.gameData?.probablePitchers.away?.id}/headshot/67/current)`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "68px",
                      border: "1px solid black",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>
              )}

              <h3 style={{ margin: "2rem" }}>{formatTime(game.gameDate)} </h3>
              <div className="pitch-preview-contianer">
                {singleGame.gameData.probablePitchers.home ? (
                  <>
                    <div
                      style={{
                        backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.gameData?.probablePitchers.home?.id}/headshot/67/current)`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        height: "100px",
                        width: "68px",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div className="cardteam2">
                      {singleGame.liveData.boxscore.teams.home.players[
                        `ID${homeStarterId}`
                      ] ? (
                        <>
                          <p>
                            <strong>
                              #
                              {
                                singleGame.liveData.boxscore.teams.home.players[
                                  `ID${homeStarterId}`
                                ]?.jerseyNumber
                              }
                            </strong>
                          </p>
                          <p>
                            {homeStarterStats?.wins}-{homeStarterStats?.losses}
                          </p>
                          <p>{homeStarterStats?.era}</p>
                        </>
                      ) : (
                        <p>
                          <strong>???</strong>
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="pitch-preview-contianer">
                    <div
                      style={{
                        backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.gameData?.probablePitchers.home?.id}/headshot/67/current)`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        height: "100px",
                        width: "68px",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div className="cardteam2">
                      <p>
                        <strong>???</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {game.status.statusCode === "I" && (
            <div className="live-look-in">
              {singleGame.liveData?.linescore.inningHalf === "Bottom" ? (
                <div className="pitch-preview-contianer">
                  <div className="cardteam2">
                    <p>
                      <strong>
                        #
                        {
                          singleGame.liveData.boxscore.teams?.away?.players[
                            `ID${singleGame.liveData?.plays.currentPlay.matchup.pitcher.id}`
                          ].jerseyNumber
                        }
                      </strong>
                    </p>

                    <p>
                      {" "}
                      {
                        singleGame.liveData.boxscore.teams?.away?.players[
                          `ID${singleGame.liveData?.plays.currentPlay.matchup.pitcher.id}`
                        ]?.stats.pitching.strikeOuts
                      }{" "}
                      K
                    </p>
                    <p>
                      {singleGame.liveData.boxscore.teams?.away?.players[
                        `ID${singleGame.liveData?.plays.currentPlay.matchup.pitcher.id}`
                      ]?.stats.pitching.pitchesThrown || 0}
                      P
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.liveData?.plays.currentPlay.matchup.pitcher.id}/headshot/67/current)`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "68px",
                      border: "1px solid black",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>
              ) : (
                <div className="pitch-preview-contianer">
                  <div className="cardteam2">
                    <p>
                      <strong>
                        #
                        {
                          singleGame.liveData.boxscore.teams?.away?.players[
                            `ID${singleGame.liveData?.plays.currentPlay.matchup.batter.id}`
                          ].jerseyNumber
                        }
                      </strong>
                    </p>
                    <p>
                      {
                        singleGame.liveData.boxscore.teams?.away?.players[
                          `ID${singleGame.liveData?.plays.currentPlay.matchup.batter.id}`
                        ]?.seasonStats.batting.avg
                      }
                    </p>
                    <p>
                      {" "}
                      {singleGame.liveData.boxscore.teams?.away?.players[
                        `ID${singleGame.liveData?.plays.currentPlay.matchup.batter.id}`
                      ]?.stats.batting.hits || 0}
                      -
                      {singleGame.liveData.boxscore.teams?.away?.players[
                        `ID${singleGame.liveData?.plays.currentPlay.matchup.batter.id}`
                      ]?.stats.batting.atBats || 0}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.liveData?.plays.currentPlay.matchup.batter.id}/headshot/67/current)`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "68px",
                      border: "1px solid black",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>
              )}

              <div className="onbase">
                <div>
                  <img
                    src={renderOnBaseImage(singleGame)}
                    alt="baserunners"
                    height="70px"
                    width="70px"
                    className="onbaseimg"
                  />
                </div>
                <div className="BSO">
                  <p>
                    B:{" "}
                    <span className="green">
                      {" "}
                      {[...Array(singleGame.liveData?.linescore.balls)].map(
                        (_, index) => (
                          <span key={index} className="count">
                            &bull;
                          </span>
                        )
                      )}
                    </span>
                  </p>
                  <p>
                    S:{" "}
                    <span className="red">
                      {" "}
                      {[...Array(singleGame.liveData?.linescore.strikes)].map(
                        (_, index) => (
                          <span key={index} className="count">
                            &bull;
                          </span>
                        )
                      )}
                    </span>
                  </p>
                  <p>
                    O:{" "}
                    <span>
                      {" "}
                      {[...Array(singleGame.liveData?.linescore.outs)].map(
                        (_, index) => (
                          <span key={index} className="count">
                            &bull;
                          </span>
                        )
                      )}
                    </span>
                  </p>
                </div>
              </div>
              {singleGame.liveData?.linescore.inningHalf === "Bottom" ? (
                <div className="pitch-preview-contianer">
                  <div
                    style={{
                      backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.liveData?.plays.currentPlay.matchup.batter.id}/headshot/67/current)`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "68px",
                      border: "1px solid black",
                      borderRadius: "5px",
                    }}
                  ></div>
                  <div className="cardteam2">
                    <p>
                      <strong>
                        #
                        {
                          singleGame.liveData.boxscore.teams?.home?.players[
                            `ID${singleGame.liveData?.plays.currentPlay.matchup.batter.id}`
                          ].jerseyNumber
                        }
                      </strong>
                    </p>
                    <p>
                      {
                        singleGame.liveData.boxscore.teams?.home?.players[
                          `ID${singleGame.liveData?.plays.currentPlay.matchup.batter.id}`
                        ]?.seasonStats.batting.avg
                      }
                    </p>
                    <p>
                      {" "}
                      {singleGame.liveData.boxscore.teams?.home?.players[
                        `ID${singleGame.liveData?.plays.currentPlay.matchup.batter.id}`
                      ]?.stats.batting.hits || 0}
                      -
                      {singleGame.liveData.boxscore.teams?.home?.players[
                        `ID${singleGame.liveData?.plays.currentPlay.matchup.batter.id}`
                      ]?.stats.batting.atBats || 0}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="pitch-preview-contianer">
                  <div
                    style={{
                      backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${singleGame.liveData?.plays.currentPlay.matchup.pitcher.id}/headshot/67/current)`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "68px",
                      border: "1px solid black",
                      borderRadius: "5px",
                    }}
                  ></div>
                  <div className="cardteam2">
                    <p>
                      <strong>
                        #
                        {
                          singleGame.liveData.boxscore.teams?.home?.players[
                            `ID${singleGame.liveData?.plays.currentPlay.matchup.pitcher.id}`
                          ].jerseyNumber
                        }
                      </strong>
                    </p>

                    <p>
                      {" "}
                      {
                        singleGame.liveData.boxscore.teams?.home?.players[
                          `ID${singleGame.liveData?.plays.currentPlay.matchup.pitcher.id}`
                        ]?.stats.pitching.strikeOuts
                      }{" "}
                      K
                    </p>
                    <p>
                      {singleGame.liveData.boxscore.teams?.home?.players[
                        `ID${singleGame.liveData?.plays.currentPlay.matchup.pitcher.id}`
                      ]?.stats.pitching.pitchesThrown || 0}
                      P
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {game.status.abstractGameCode === "L" ? (
            <>
              <h6>
                P:{" "}
                {
                  singleGame.liveData?.plays.currentPlay.matchup.pitcher
                    .fullName
                }
              </h6>
              <h6>
                B:{" "}
                {singleGame.liveData?.plays.currentPlay.matchup.batter.fullName}
              </h6>
            </>
          ) : (
            ""
          )}
          {game.status.codedGameState === "D" ? <> </> : ""}
          {game.status.codedGameState === "F" ||
          game.status.codedGameState === "O" ? (
            <>
              {" "}
              <h6>W: {singleGame.liveData?.decisions.winner.fullName}</h6>
              <h6>L: {singleGame.liveData?.decisions.loser.fullName}</h6>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="singlegamebox">
        {game.status.statusCode === "I" ? (
          <>
            {singleGame.liveData?.linescore.inningHalf === "Top" ? (
              <AiOutlineArrowUp />
            ) : (
              <AiOutlineArrowDown />
            )}
            {singleGame.liveData?.linescore.currentInningOrdinal}
          </>
        ) : game.status.codedGameState === "D" ? (
          <div>
            <h4> POSTPONED </h4>
            <h5>Rechedule Date: {formatShortDate2(game.rescheduleGameDate)}</h5>
          </div>
        ) : game.status.statusCode === "PR" ? (
          <div>
            <h4> DELAYED: {game.status.reason.toUpperCase()} </h4>
          </div>
        ) : game.status.abstractGameCode === "F" ? (
          <Link to={`/boxscore/${game.gamePk}`}>
            <Boxscore boxscore={singleGame} />
          </Link>
        ) : game.status.statusCode === "UI" ? (
          <div>
            <h4> SUSPENDED </h4>
            <br />
            {singleGame.liveData?.linescore.inningHalf === "Top" ? (
              <AiOutlineArrowUp />
            ) : (
              <AiOutlineArrowDown />
            )}
            {singleGame.liveData?.linescore.currentInningOrdinal}
          </div>
        ) : (
          <h4>
            {singleGame.gameData?.probablePitchers.away?.fullName ?? "TBD"} vs.{" "}
            {singleGame.gameData?.probablePitchers.home?.fullName ?? "TBD"}
          </h4>
        )}
      </div>
    </div>
  );
}

SingleGame.propTypes = {
  game: PropTypes.object.isRequired,
  odds: PropTypes.array.isRequired,
  user: PropTypes.object,
  today: PropTypes.bool.isRequired,
};

export default SingleGame;
