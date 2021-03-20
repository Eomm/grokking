'use strict'

const { test } = require('tap')
const maskify = require('../../../games/interview/mask')

test('mask credit card numbers', t => {
  t.equal(maskify('4556364607935616'), '4###########5616')
  t.equal(maskify('4556-3646-0793-5616\n'), '4###-####-####-5616')
  t.equal(maskify('64607935616'), '6######5616')
  t.equal(maskify('ABCD-EFGH-IJKLM-NOPQ'), 'ABCD-EFGH-IJKLM-NOPQ')
  t.equal(maskify('A1234567BCDEFG89HI'), 'A#######BCDEFG89HI')
  t.equal(maskify('12345'), '12345')
  t.equal(maskify('654321'), '6#4321')
  t.equal(maskify(''), '')
  t.equal(maskify('Skippy'), 'Skippy')
  t.end()
})
