'use strict'

const ROMAN_TABLE = Object.freeze({ I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
})

module.exports = function decode (roman) {
  return roman.split('')
    .reverse()
    .map(char => ROMAN_TABLE[char])
    .reduce((total, num, index, array) => {
      const last = array[index - 1] || 0
      if (num >= last) {
        total += num
      } else {
        total -= num
      }
      return total
    }, 0)
}
