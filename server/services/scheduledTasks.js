const { callUpdateBets } = require("./updateBets");
const fetchOdds = require("./fetchOdds");

const cron = require("node-cron");

const task3 = cron.schedule("15 10 * * *", () => {
  console.log("Time to fetch the odds!");
});

const task5 = cron.schedule("*/1 12-23,0-3 * * *", () => {
  console.log("running every minute during baseball hours");
});

// Fetches odds every day at 10:15AM
const scheduleFetchOdds = cron.schedule("15 10 * 3-10 *", () => {
  fetchOdds();
  console.log("Odds have been fetched!");
});

// Checks for game resuls every minute during baseball hours
const scheduleBetUpdates = cron.schedule("*/1 12-23,0-3 * 3-10 *", () => {
  callUpdateBets();
  console.log("Checking for game results and updating bets!");
});

const runAllTasks = () => {
  task3.start();
  task5.start();
  scheduleBetUpdates.start();
  scheduleFetchOdds.start();
};

module.exports = { runAllTasks };
