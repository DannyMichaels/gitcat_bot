const compareDateWithCurrentTime = (date) => {
  let currentTime = new Date().getTime();
  let dateStartTime = new Date(date).getTime();

  if (currentTime < dateStartTime) {
    // if the currentTime is less than the date start time, that means the date didn't start (date is in future)
    return -1;
  } else if (currentTime > dateStartTime) {
    // if the current time is greater than the date start time, that means the date started (date is in past)
    return 1;
  } else {
    return 0;
  }
};

module.exports = {
  compareDateWithCurrentTime,
};
