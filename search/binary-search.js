'use strict'

/**
 * O(log n)
 * Constraint: Array must be sorted
 */

Array.prototype.binarySearch = function binarySearch (searchFor) { // eslint-disable-line no-extend-native
  let low = 0
  let high = this.length - 1

  let steps = 0
  while (low <= high) {
    steps++
    // console.log(`Step ${steps}`)

    const middle = Math.round((low + high) / 2)
    const guess = this[middle]
    if (guess === searchFor) {
      return { found: middle, steps }
    } else if (guess > searchFor) {
      high = middle - 1
    } else {
      low = middle + 1
    }
  }
  return { found: null, steps }
}

module.exports = function (searchFor, inArray) {
  return inArray.binarySearch(searchFor)
}
