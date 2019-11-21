/**
 * Converts an object that implements the Time interface
 * to a time representing string with leading zeros in front of the hours and minutes properties
 * @param {Time} timeToSolve - The time object to be converted
 * @returns {string} - The string representing the time object with leading zeros
 */
const ttsToString = (time) => {
  let timeToSolve = `${time.hours < 10
    ? `0${time.hours}`
    : time.hours}:`;

  timeToSolve += `${time.minutes < 10
    ? `0${time.minutes}`
    : time.minutes}`;

  return timeToSolve;
};

export default ttsToString;
