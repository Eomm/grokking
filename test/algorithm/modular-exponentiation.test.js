'use strict'

const { test } = require('tap')
const exponentiation = require('../../algorithm/modular-exponentiation')

test('small numbers', t => {
  t.plan(1)
  const res = exponentiation(2, 2, 10)
  t.equals(res, 4)
})

test('big numbers', t => {
  t.plan(1)
  const res = exponentiation(12, 53, 7)
  t.equals(res, 3)
})

test('huge numbers', t => {
  t.plan(1)
  const res = exponentiation(2, 90, 13)
  t.equals(res, 12)
})
