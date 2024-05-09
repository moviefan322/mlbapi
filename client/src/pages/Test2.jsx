// import React, { useState, useEffect } from "react";

// const Test2 = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [formattedSchedule, setFormattedSchedule] = useState([]);

//   const getFullSchedule = async () => {
//     const response = await fetch(
//       "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2024-03-30&endDate=2024-10-01"
//     );
//     const data = await response.json();
//     const games = data.dates.flatMap((date) => date.games);
//     const teams = {};
//     games.forEach((game) => {
//       const homeTeamId = game.teams.home.team.id;
//       const awayTeamId = game.teams.away.team.id;

//       if (!teams[homeTeamId]) {
//         teams[homeTeamId] = {};
//       }
//       if (!teams[homeTeamId][game.teams.away.seriesNumber]) {
//         teams[homeTeamId][game.teams.away.seriesNumber] = [];
//       }
//       if (!teams[awayTeamId]) {
//         teams[awayTeamId] = {};
//       }
//       if (!teams[awayTeamId][game.teams.away.seriesNumber]) {
//         teams[awayTeamId][game.teams.away.seriesNumber] = [];
//       }

//       teams[homeTeamId][game.teams.away.seriesNumber].push(game);
//       if (homeTeamId !== awayTeamId) {
//         teams[awayTeamId][game.teams.away.seriesNumber].push(game);
//       }
//     });

//     delete teams[159];
//     delete teams[160];

//     for (let team in teams) {
//       for (let series in teams[team]) {
//         const numberOfGames = teams[team][series][0].gamesInSeries;
//         const lengthOfArray = teams[team][series].length;
//         const homeTeamIdFirstGame = teams[team][series][0].teams.home.team.id;
//         const awayTeamIdFirstGame = teams[team][series][0].teams.away.team.id;
//         const startDate = teams[team][series][0].gameDate;
//         const endDate =
//           teams[team][series][teams[team][series].length - 1].gameDate;

//         if (numberOfGames !== lengthOfArray) {
//           console.log(teams[team][series]);
//           const seriesNumber = teams[team][series][0].teams.away.seriesNumber;

//           if (
//             teams[team][seriesNumber - 1] > 0 &&
//             !teams[team][seriesNumber - 1]
//           ) {
//             teams[team][seriesNumber - 1] = [];
//             while (
//               teams[team][seriesNumber][0].teams.away.team.id !==
//               teams[team][seriesNumber][teams[team][seriesNumber].length - 1]
//                 .teams.away.team.id
//             ) {
//               const itemToMove = teams[team][seriesNumber].shift();
//               teams[team][seriesNumber - 1].push(itemToMove);
//             }
//           }
//         }
//       }
//     }
//     // if (
//     //   teams[team][series][0].teams.away.team.id !==
//     //     teams[team][series][teams[team][series].length - 1].teams.away.team
//     //       .id ||
//     //   teams[team][series][0].teams.home.team.id !==
//     //     teams[team][series][teams[team][series].length - 1].teams.home.team
//     //       .id
//     // ) {
//     //   if (
//     //     teams[team][series][0].teams.away.team.id !==
//     //     teams[team][series][teams[team][series].length - 1].teams.home.team
//     //       .id
//     //   ) {
//     //     const seriesNumber = teams[team][series][0].teams.away.seriesNumber;

//     //     if (!teams[team][seriesNumber - 1]) {
//     //       teams[team][seriesNumber - 1] = [];
//     //       while (
//     //         teams[team][seriesNumber][0].teams.away.team.id !==
//     //         teams[team][seriesNumber][teams[team][seriesNumber].length - 1]
//     //           .teams.away.team.id
//     //       ) {
//     //         const itemToMove = teams[team][seriesNumber].shift();
//     //         teams[team][seriesNumber - 1].push(itemToMove);
//     //       }
//     //     }
//     //   }
//     // }
//     console.log(teams);
//   };

//   useEffect(() => {
//     getFullSchedule();
//   }, []);

//   return <div></div>;
// };

// export default Test2;
