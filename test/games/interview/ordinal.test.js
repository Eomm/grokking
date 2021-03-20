'use strict'

const { test } = require('tap')
const numberToOrdinal = require('../../../games/interview/ordinal')

test('translate numbers to ordinal', t => {
  t.equal(numberToOrdinal(1), '1st')
  t.equal(numberToOrdinal(2), '2nd')
  t.equal(numberToOrdinal(3), '3rd')
  t.equal(numberToOrdinal(4), '4th')
  t.equal(numberToOrdinal(11), '11th')
  t.equal(numberToOrdinal(12), '12th')
  t.equal(numberToOrdinal(112), '112th')
  t.equal(numberToOrdinal(10000011), '10000011th')
  t.equal(numberToOrdinal(10000013), '10000013th')
  t.equal(numberToOrdinal(1099992827213), '1099992827213th')
  t.equal(numberToOrdinal(21), '21st')
  t.equal(numberToOrdinal(99993), '99993rd')

  t.end()
})
