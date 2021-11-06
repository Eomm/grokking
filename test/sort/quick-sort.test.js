'use strict'

const { test } = require('tap')
const quickSort = require('../../sort/quick-sort')

test('quick sort', t => {
  t.plan(3)

  t.test('base case', t => {
    t.plan(1)
    const unsortedArray = []
    const res = quickSort(unsortedArray)
    t.same(res, [])
  })

  t.test('edge case', t => {
    t.plan(2)
    const unsortedArray = [1, 1, 1, 1, 1, -5]
    const duplicates = unsortedArray.slice(0)
    const res = quickSort(unsortedArray)
    t.same(res, [-5, 1, 1, 1, 1, 1])
    t.same(unsortedArray, duplicates) // should not changed
  })

  t.test('sort', t => {
    t.plan(2)
    const unsortedArray = [99, 66, 44, 33, 11, 0, -1, 123, 6, 4, 9, 10, 32, 42, 11, 1989]
    const duplicates = unsortedArray.slice(0)
    const res = quickSort(unsortedArray)
    t.same(res, [-1, 0, 4, 6, 9, 10, 11, 11, 32, 33, 42, 44, 66, 99, 123, 1989])
    t.same(unsortedArray, duplicates) // should not changed
  })
})
