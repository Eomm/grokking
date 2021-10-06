'use strict'

const { test } = require('tap')

/* eslint no-proto: "off" */
test('symbol hiding', t => {
  t.plan(5)

  const obj = {
    a: 1,
    [Symbol.for('b')]: 2
  }
  obj.__proto__.c = 3

  t.same(Object.keys(obj), ['a'])
  t.same(Object.values(obj), [1])

  t.same(Object.entries(obj), [['a', 1]])

  const equals = ['a', 'c']
  for (const k in obj) {
    t.equal(k, equals.shift())
  }
})
