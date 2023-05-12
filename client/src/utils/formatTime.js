const monthsWith30Days = [4, 6, 9, 11];

const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate() + 1;
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

const formatTime = (date) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const newTime = hours + ":" + minutes;
  return newTime;
};

module.exports = {
  formatDate,
  formatTime,
  formatDate2,
  formatDate3,
};
