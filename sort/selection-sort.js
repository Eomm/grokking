'use strict'

/**
 * O(n²)
 */

module.exports = function selectionSort (unordered) {
  const sorting = unordered.slice(0)
  const end = sorting.length
  for (let i = 0; i < end; i++) {
    let iMin = i
    for (let k = i; k < end; k++) {
      if (sorting[k] < sorting[iMin]) {
        iMin = k
      }
    }
    const temp = sorting[i]
    sorting[i] = sorting[iMin]
    sorting[iMin] = temp
  }
  return sorting
}
