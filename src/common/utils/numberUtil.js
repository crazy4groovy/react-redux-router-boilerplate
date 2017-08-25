/**
 * Check if a value is a number
 *
 * @param {any} value
 * @returns {boolean}
 */
export const checkNumber = value => !Number.isNaN(+value)

const regexIsNumber = /^-?[0-9]*\.?[0-9]*$/
/**
 * Convert strings to numbers (for managed React components)
 *
 * @param {string} value
 * @param {number} oldValue
 * @returns {number}
 */
export const stringToNumber = (value/* : string */, oldValue/* : number */) => {
  if (value) {
    return regexIsNumber.test(value) ? Number(value) : oldValue
  }
  if (oldValue >= 10) {
    return oldValue
  }
  return 0
}

/**
 * Convert a number to a fixed max number of decimal places as a string
 *
 * @param {number} number
 * @param {Object} opts
 * @returns {string}
 */
export const trimToDecimals = (number, { decimalPlaces = 2, appendChar = '' } = {}) =>
  `${Number(number.toFixed(decimalPlaces)).toString()}${appendChar}`
