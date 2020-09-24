'use strict'

const { test } = require('tap')
const eratosthenes = require('../../algorithm/eratosthenes')

test('basic test slow', t => {
  t.plan(1)
  const primes = eratosthenes.slow(121)
  t.deepEquals(primes, [
    2, 3, 5, 7, 11, 13, 17, 19, 23,
    29, 31, 37, 41, 43, 47, 53, 59, 61,
    67, 71, 73, 79, 83, 89, 97, 101, 103,
    107, 109, 113
  ])
})

test('basic test fast', t => {
  t.plan(1)
  const primes = eratosthenes.fast(121)
  t.deepEquals(primes, [
    2, 3, 5, 7, 11, 13, 17, 19, 23,
    29, 31, 37, 41, 43, 47, 53, 59, 61,
    67, 71, 73, 79, 83, 89, 97, 101, 103,
    107, 109, 113
  ])
})

test('big test slow', { timeout: 0 }, t => {
  t.plan(1)
  const primes = eratosthenes.slow(1000000)
  t.deepEquals(primes.length, 78498)
})

test('big test fast', t => {
  t.plan(1)
  const primes = eratosthenes.fast(1000000)
  t.deepEquals(primes.length, 78498)
})
