'use strict'

const { test } = require('tap')
const toBase64 = require('../../../games/interview/base64')

test('encode string to base64', t => {
  t.equal(toBase64('this is a string!!'), 'dGhpcyBpcyBhIHN0cmluZyEh')
  t.equal(toBase64('this is a test!'), 'dGhpcyBpcyBhIHRlc3Qh')
  t.equal(toBase64('ABCDEFGHIJKLMNOPQRSTUVWXYZ '), 'QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVog')
  t.end()
})
