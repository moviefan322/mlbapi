const monthsWith30Days = [4, 6, 9, 11];

const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  if (day === 32) {
    return `${month + 1}/1`;
  }
  if (monthsWith30Days.includes(month) && day === 31) {
    return `${month + 1}/1`;
  }
  const newDate = `${month}/${day}`;
  return newDate;
};

const formatDate2 = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate() + 1;
  if (day === 32) {
    return 1;
  }
  if (monthsWith30Days.includes(month) && day === 31) {
    return 1;
  }
  const newDate = `${day}`;
  return newDate;
};

const formatDate3 = (str) => {
  const dateArray = str.split("-");
  const month = parseInt(dateArray[3]);
  const day = parseInt(dateArray[4]);
  return `${month}/${day}`;
};

const formatDate4 = (input) => {
  const date = new Date(input);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[date.getUTCDay()];

  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  return `${months[month]} ${date.getUTCDate()}, ${year}`;
};
const formatTime = (date) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const newTime = hours + ":" + minutes;
  return newTime;
};

function formatShortDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Adding 1 since getMonth() returns a zero-based index
  const day = date.getDate();
  return `${month}-${day}`;
}

function formatShortDate2(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Adding 1 since getMonth() returns a zero-based index
  const day = date.getDate() + 1;
  return `${month}-${day}`;
}

module.exports = {
  formatDate,
  formatTime,
  formatDate2,
  formatDate3,
  formatDate4,
  formatShortDate,
  formatShortDate2,
};
