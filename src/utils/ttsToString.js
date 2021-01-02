import dayjs from 'dayjs';
import withLeadingZero from './withLeadingZero';

/**
 * Converts a Unix timestamp number to a time representing string with
 * leading zeros in front of the hours and minutes properties
 * @param {number} tts - The time object to be converted
 * @returns {string} - The string representing the time object with leading zeros
 */
const ttsToString = (tts) => {
  const duration = dayjs.duration(tts, 'seconds');

  const hours = withLeadingZero(duration.hours());
  const minutes = withLeadingZero(duration.minutes());

  return `${hours}:${minutes}`;
};

export default ttsToString;
