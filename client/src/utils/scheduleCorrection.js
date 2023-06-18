const keyArray = [
  108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 133,
  134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 158,
];

const pruneSchedule = (teamSchedule) => {
  for (let teamId in teamSchedule) {
    for (let series in teamSchedule[teamId]) {
      const seriesNumber = parseInt(series);
      if (teamSchedule[teamId][seriesNumber].length === 1) {
        teamSchedule[teamId][seriesNumber] = [];

        // fix keys of following series
        for (let j = seriesNumber; j < 53; j++) {
          const seriesVariableName = `${j}`;
          const newSeriesVariableName = `${j - 1}`;
          teamSchedule[teamId][newSeriesVariableName] =
            teamSchedule[teamId][seriesVariableName];
          delete teamSchedule[teamId][seriesVariableName];
        }
      }
    }
  }
  return teamSchedule;
};

export const fixScheduleErrors = (schedule) => {
  delete schedule[160];
  delete schedule[159];

  // pruneSchedule(schedule);
  // loop through each team
  for (var i = 108; i < 158; i++) {
    if (schedule[i] === undefined) {
      continue; // Skip empty objects
    }
    let unEvenSeries = [];
    // loop through each series
    for (var j = 1; j < 52; j++) {
      if (schedule[i][j].length > 0) {
        const currentSeriesArrayLength = schedule[i][j].length;
        const currentSeriesLength =
          schedule[i][j][currentSeriesArrayLength - 1].seriesGameNumber;

        if (currentSeriesLength !== currentSeriesArrayLength) {
          unEvenSeries.push(j);
        }
      }
      // if series is empty, save to new variable
      if (schedule[i][j].length === 0) {
        const previousSeriesArrayLength = schedule[i][j - 1].length;
        if (schedule[i][j - 1].length > 0) {
          const previousSeriesLength =
            schedule[i][j - 1][previousSeriesArrayLength - 1].seriesGameNumber;

          // check if final game in previous series game.seriesGameNumber is equal to series.length
          if (previousSeriesLength !== previousSeriesArrayLength) {
            // if not, splice that seriesGameNumber.length from previous series into empty series
            schedule[i][j] = schedule[i][j - 1].splice(
              previousSeriesLength,
              previousSeriesArrayLength - previousSeriesLength
            );
          }
          // if seriesGameNumber is equal to series.length, repeat steps for series after empty series

          if (previousSeriesLength === previousSeriesArrayLength) {
            const nextSeriesArrayLength = schedule[i][j + 1].length;
            if (schedule[i][j + 1].length > 0) {
              const nextSeriesLength =
                schedule[i][j + 1][nextSeriesArrayLength - 1].seriesGameNumber;
              if (nextSeriesLength !== nextSeriesArrayLength) {
                // if not, splice that seriesGameNumber.length from previous series into empty series
                schedule[i][j] = schedule[i][j + 1].splice(
                  nextSeriesLength,
                  nextSeriesArrayLength - nextSeriesLength
                );
              }
            }
          }
        }
      }
    }
  }

  const newSched = fixScheduleErrors2(schedule);

  return newSched;
};

export const fixScheduleErrors2 = (schedule) => {
  delete schedule[160];
  delete schedule[159];
  // schedule = pruneSchedule(schedule);
  schedule = givePropertyToSeries(schedule);
  console.log(schedule[109][30]);

  for (let teamId in schedule) {
    let doubleSeries = [];
    let undefinedSeries = [];
    let mislabeledLength = [];

    for (let seriesIndex in schedule[teamId]) {
      const series = schedule[teamId][seriesIndex];
      if (series === false) {
        // if (Number(seriesIndex) === 52) {
        //   continue;
        // }
        undefinedSeries.push(Number(seriesIndex));
      }

      if (series.length > 1) {
        const PPD = checkForPPD(series);
        if (PPD) {
          continue;
        }
        if (
          series.length !== series[series.length - 1].gamesInSeries &&
          series.length > 3
        ) {
          doubleSeries.push(Number(seriesIndex));
        }
        if (
          series[0].teams.away.team.id !==
            series[series.length - 1].teams.away.team.id ||
          series[0].teams.home.team.id !==
            series[series.length - 1].teams.home.team.id
        ) {
          mislabeledLength.push(Number(seriesIndex));
        }
      }
    }

    if (mislabeledLength.length > 0) {
      for (let i = 0; i < mislabeledLength.length; i++) {
        const mislabeledLengthIndex = mislabeledLength[i];
        const series = schedule[teamId][mislabeledLengthIndex];
        let firstSeries = [];
        let secondSeries = [];
        for (let j = 0; j < series.length; j++) {
          if (
            series[j].teams.away.team.id === series[0].teams.away.team.id &&
            series[j].teams.home.team.id === series[0].teams.home.team.id
          ) {
            firstSeries.push(series[j]);
          } else {
            secondSeries.push(series[j]);
          }
        }
        schedule[teamId][mislabeledLengthIndex] = firstSeries;
        schedule[teamId][mislabeledLengthIndex + 1] = secondSeries;
      }
    }

    if (undefinedSeries.length > 0) {
      for (let i = 0; i < undefinedSeries.length; i++) {
        const undefinedSeriesIndex = undefinedSeries[i];
        const doubleSeriesIndex = doubleSeries[i];

        if (doubleSeriesIndex === undefinedSeriesIndex - 1) {
          const doubleSeries = schedule[teamId][doubleSeriesIndex];
          const lengthOfSeries =
            doubleSeries[schedule[teamId][doubleSeriesIndex].length - 1]
              .gamesInSeries;
          schedule[teamId][undefinedSeriesIndex] = schedule[teamId][
            doubleSeriesIndex
          ].splice(lengthOfSeries, doubleSeries.length - lengthOfSeries);
        }

        if (doubleSeriesIndex === undefinedSeriesIndex + 1) {
          const doubleSeries = schedule[teamId][doubleSeriesIndex];
          const lengthOfSeries =
            doubleSeries[schedule[teamId][doubleSeriesIndex].length - 1]
              .gamesInSeries;
          schedule[teamId][undefinedSeriesIndex] = schedule[teamId][
            doubleSeriesIndex
          ].splice(lengthOfSeries, doubleSeries.length - lengthOfSeries);
        }

        for (let j = 0; j < keyArray.length; j++) {
          const key = keyArray[j];
          if (
            schedule[key][undefinedSeriesIndex]?.teams?.away?.team.id ===
              teamId ||
            schedule[key][undefinedSeriesIndex]?.teams?.home?.team.id === teamId
          ) {
            schedule[teamId][undefinedSeriesIndex] =
              schedule[key][undefinedSeriesIndex];
          }

          // const prevGameDate =
          //   schedule[teamId][undefinedSeriesIndex - 1][
          //     schedule[teamId][undefinedSeriesIndex - 1]?.length - 1
          //   ]?.calendarEventID.split("-")[4];
          // const nextGameDate =
          //   schedule[teamId][
          //     undefinedSeriesIndex + 1
          //   ][0]?.calendarEventID.split("-")[4];

          // if (
          //   schedule[key][undefinedSeriesIndex - 1][0]?.teams?.away.team
          //     .id === teamId ||
          //   (schedule[key][undefinedSeriesIndex - 1][0]?.teams?.home?.team
          //     .id === teamId &&
          //     schedule[key][
          //       undefinedSeriesIndex - 1
          //     ]?.[0]?.calendarEventID.split("-")[4] ===
          //       prevGameDate + 1)
          // ) {
          //   schedule[teamId][undefinedSeriesIndex] =
          //     schedule[key][undefinedSeriesIndex - 1];
          // }

          // if (
          //   schedule[key][undefinedSeriesIndex + 1]?.[0]?.teams?.away.team
          //     .id === teamId ||
          //   (schedule[key][undefinedSeriesIndex + 1]?.[0]?.teams?.home?.team
          //     .id === teamId &&
          //     schedule[key][
          //       undefinedSeriesIndex + 1
          //     ]?.[0]?.calendarEventID.split("-")[4] ===
          //       nextGameDate - 1)
          // ) {
          //   schedule[teamId][undefinedSeriesIndex] =
          //     schedule[key][undefinedSeriesIndex + 1];
          // }
        }
      }
    }
  }

  return schedule;
};

const checkForPPD = (series) => {
  for (let game in series) {
    if (series[game].status.codedGameState === "D") {
      return true;
    }
  }
  return false;
};

const givePropertyToSeries = (schedule) => {
  for (let teamId in schedule) {
    for (let seriesIndex in schedule[teamId]) {
      const series = schedule[teamId][seriesIndex];
      if (series.length === 0) {
        schedule[teamId][seriesIndex] = false;
      }
    }
  }
  return schedule;
};
