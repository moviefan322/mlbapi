const { callUpdateBets } = require("./updateBets");
const fetchOdds = require("./fetchOdds");
const { writeTodaysGames } = require("./todaysGames");

const cron = require("node-cron");

const task3 = cron.schedule("15 10 * * *", () => {
  console.log("Time to fetch the odds!");
});

const task5 = cron.schedule("*/1 11-23,0-3 * * *", () => {
  console.log("running every minute during baseball hours");
});

const scheduleWriteTodaysGames = cron.schedule("01 10 * 3-10 *", () => {
  writeTodaysGames();
  console.log("It's 10:01 AM and todays schedule has been writ!");
});

// Fetches odds every day at 10:15AM
const scheduleFetchOdds = cron.schedule("46 10 * 3-10 *", () => {
  fetchOdds();
  console.log("It's 10:45 AM and todays odds have been fetched!");
});

// Checks for game resuls every minute during baseball hours
const scheduleBetUpdates = cron.schedule("*/1 12-23,0-3 * 3-10 *", () => {
  callUpdateBets();
});

const runAllTasks = () => {
  task3.start();
  task5.start();
  scheduleBetUpdates.start();
  scheduleFetchOdds.start();
  scheduleWriteTodaysGames.start();
};

module.exports = { runAllTasks };
