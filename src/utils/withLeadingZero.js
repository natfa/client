/**
 * Returns a string representation of the number with a leading zero
 * if the number is one character long.
 * @param {number} n - The number to prepend with 0
 * @returns {string} The string representation of the number with a leading zero
 */
const withLeadingZero = (n) => {
  if (n < 10) {
    return `0${n}`;
  }

  return n;
};

export default withLeadingZero;
