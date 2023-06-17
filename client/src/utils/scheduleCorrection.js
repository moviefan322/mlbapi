const pruneSchedule = (teamSchedule) => {
  for (let teamId in teamSchedule) {
    for (let series in teamSchedule[teamId]) {
      const seriesNumber = parseInt(series);
      if (teamSchedule[teamId][seriesNumber].length === 1) {
        delete teamSchedule[teamId][seriesNumber];

        // fix keys of following series
        for (let j = seriesNumber + 1; j < 53; j++) {
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
  
  pruneSchedule(schedule);
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

const fixScheduleErrors2 = (schedule) => {
  for (let teamId in schedule) {
    let doubleSeries = [];
    let undefinedSeries = [];
    for (let seriesIndex in schedule[teamId]) {
      const series = schedule[teamId][seriesIndex];
      if (series.length === 0) {
        undefinedSeries.push(seriesIndex);
      }
      if (series.length > 1) {
        const PPD = checkForPPD(series);
        if (PPD) {
          continue;
        }
        if (series.length !== series[series.length - 1].gamesInSeries) {
          doubleSeries.push(Number(seriesIndex));
        }
      }

      if (doubleSeries.length > 0 && undefinedSeries.length > 0) {
        // console.log(doubleSeries, undefinedSeries);
      }
    }
    console.log(doubleSeries, undefinedSeries);
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

const shiftSeries = (series) => {
  for (let game in series) {
    const seriesNumber = Number(game.teams.away.seriesNumber);
    game.teams.away.seriesNumber = seriesNumber + 1;
    game.teams.home.seriesNumber = seriesNumber + 1;
    console.log(seriesNumber, series);
  }
};
