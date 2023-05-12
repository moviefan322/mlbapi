const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const newDate = `${month}/${day}`;
  return newDate;
};

const formatDate2 = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const newDate = `${day}`;
  return newDate;
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
};
