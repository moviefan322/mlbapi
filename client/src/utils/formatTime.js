const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const newDate = `${month}/${day}`;
  return newDate;
};

const formatTime = (date) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const newTime = hours + ":" + minutes;
  return newTime;
};

const formattedtMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return "0" + month.toString();
  } else {
    return month.toString();
  }
};

module.exports = {
  formatDate,
  formatTime,
  formattedtMonth,
};
