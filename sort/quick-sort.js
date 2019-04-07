'use strict'

/**
 * Worse: O(n²)
 * Average: O(n log2 n)
 */

module.exports = function quickSort (unordered) {
  const sorting = unordered.slice(0)
  const len = sorting.length
  if (len < 2) {
    return sorting
  }
  const iPivot = Math.round(len / 2)
  const pivot = sorting[iPivot]

  const [less, more] = lessMorePartition(sorting, iPivot)

  return [...quickSort(less), pivot, ...quickSort(more)]

  function lessMorePartition (array, iPivot) {
    const pivot = array[iPivot]
    return array.reduce((acc, e, i) => {
      if (i === iPivot) {
        return acc
      }
      const [less, more] = acc
      e <= pivot ? less.push(e) : more.push(e)
      return acc
    }, [[], []])
  }
}
