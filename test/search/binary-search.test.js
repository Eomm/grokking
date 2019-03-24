'use strict'

const { test } = require('tap')
const binarySearch = require('../../search/binary-search')

test('binary search', t => {
  t.plan(2)

  t.test('found', t => {
    t.plan(1)
    const sortedArray = Array(1024).fill(0).map((_, i) => i)
    const res = binarySearch(800, sortedArray)
    t.deepEquals(res, { found: 800, steps: 5 })
  })

  t.test('not found', t => {
    t.plan(1)
    const sortedArray = Array(1024).fill(0).map((_, i) => i)
    const res = binarySearch(2000, sortedArray)
    t.deepEquals(res, { found: null, steps: 10 })
  })
})
