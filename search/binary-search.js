'use strict'

/**
 * O(log n)
 * Constraint: Array must be sorted
 */

Array.prototype.binarySearch = function binarySearch(searchFor) {
  let low = 0
  let high = this.length - 1

  let steps = 0
  while (low <= high) {
    steps++
    console.log(`Step ${steps}`);

    const middle = Math.round((low + high) / 2)
    const guess = this[middle]
    if (guess === searchFor) {
      return middle
    } else if (guess > searchFor) {
      high = middle - 1
    } else {
      low = middle + 1
    }
  }
  return null
}

const sortedArray = Array(1024).fill(0).map((_, i) => i)

const output = sortedArray.binarySearch(800)
console.log(`Result ${output}`);
