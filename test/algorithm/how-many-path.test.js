'use strict'

const { test } = require('tap')
const howManyPath = require('../../algorithm/how-many-path')

test('basic test', t => {
  t.plan(1)
  const res = howManyPath([0, 0], [2, 1])
  t.equals(res, 3)
})

test('bigger test', t => {
  t.plan(1)
  const res = howManyPath([1, 0], [5, 10])
  t.equals(res, 1001)
})
