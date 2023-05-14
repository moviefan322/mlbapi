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

const task4 = cron.schedule("32 10 * * *", () => {
  console.log("Time to fetch the odds!");
});

const runAllTasks = () => {
  task1.start();
  task2.start();
  task3.start();
  task4.start();
};

module.exports = { runAllTasks };
