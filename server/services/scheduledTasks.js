const { callUpdateBets } = require("./updateBets");
const fetchOdds = require("./fetchOdds");
const { writeTodaysGames } = require("./todaysGames");
const { handleBetUpdates } = require("../controllers/sseController");
const { writeYesterdaysGames } = require("./getYesterdaysGames");

const cron = require("node-cron");

const task3 = cron.schedule("10 09 * * *", () => {
  console.log("Time to fetch the odds!");
  writeTodaysGames();
  fetchOdds();
});

const task5 = cron.schedule("*/1 8-23,0-3 * * *", () => {
  console.log("running every minute during baseball hours");
  writeTodaysGames();
  fetchOdds();
});

const scheduleWriteTodaysGames = cron.schedule("25 15 * * *", () => {
  writeTodaysGames();
  writeYesterdaysGames();
  fetchOdds();
  console.log("It's 3PM and todays schedule has been writ (yesterdays too!)!");
});

const herokuTask = () => {
  writeTodaysGames();
  writeYesterdaysGames();
  fetchOdds();
  console.log("It's 3PM and todays schedule has been writ (yesterdays too!)!");
};

const scheduleWriteTodaysGames2 = cron.schedule("01 10 * 3-10 *", () => {
  writeTodaysGames();
  writeYesterdaysGames();
  fetchOdds();
  console.log(
    "It's 10:01 AM and todays schedule has been writ (yesterdays too!)!"
  );
});

// Fetches odds every day at 10:15AM
const scheduleFetchOdds = cron.schedule("06 11 * 3-10 *", () => {
  fetchOdds();
  console.log("Odds have been fetched!");
});

// Checks for game resuls every minute during baseball hours
const scheduleBetUpdates = cron.schedule("*/1 12-23,0-3 * 3-10 *", () => {
  console.log("scheduledUpdate");
  callUpdateBets();
});

const runAllTasks = () => {
  task3.start();
  task5.start();
  scheduleBetUpdates.start();
  scheduleFetchOdds.start();
  scheduleWriteTodaysGames.start();
  scheduleWriteTodaysGames2.start();
};

module.exports = { runAllTasks, scheduleWriteTodaysGames, herokuTask };
