'use strict'

const { test } = require('tap')
const decode = require('../../../games/interview/roman')

test('decode roman number', t => {
  t.equal(decode('I'), 1)
  t.equal(decode('XXI'), 21)
  t.equal(decode('IV'), 4)
  t.end()
})
