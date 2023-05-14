const { callUpdateBets } = require("./updateBets");
const fetchOdds = require("./fetchOdds");

const cron = require("node-cron");

const task1 = cron.schedule("* * * * *", () => {
  console.log("running task 1 every minute");
});

const task2 = cron.schedule("*/5 * * * * *", () => {
  console.log("running task 2 every 5 seconds");
});

const task3 = cron.schedule("15 10 * * *", () => {
  console.log("Time to fetch the odds!");
});

const task5 = cron.schedule("*/1 12-23,0-3 * * *", () => {
  console.log("running every minute during baseball hours");
});

// Fetches odds every day at 10:15AM
const fetchOdds = cron.schedule("15 10 * 3-10 *", () => {
  fetchOdds();
});

// Checks for game resuls every minute during baseball hours
const scheduleBetUpdates = cron.schedule("*/1 12-23,0-3 * 3-10 *", () => {
  callUpdateBets();
});

const runAllTasks = () => {
  task1.start();
  task2.start();
  task3.start();
  task5.start();
  scheduleBetUpdates.start();
};

module.exports = { runAllTasks };
