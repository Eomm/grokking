'use strict'

const { test } = require('tap')
const dijkstra = require('../../algorithm/dijkstra')

test('basic test', t => {
  t.plan(1)
  const path = dijkstra({
    A: { B: 5, C: 3, E: 2 },
    B: { D: 2 },
    C: { B: 1, D: 1 },
    D: { A: 1, H: 1, G: 2 },
    E: { A: 1, I: 7, H: 4 },
    F: { G: 1, B: 3 },
    G: { C: 3, I: 2 },
    H: { C: 2, G: 2, F: 2 },
    I: {}
  }, 'A', 'I')
  t.deepEquals(path, [ 'A', 'C', 'D', 'G', 'I' ])
})

test('no path', t => {
  t.plan(1)
  const path = dijkstra({
    '0': { '2': 1 },
    '1': { '0': 6, '3': 8, '5': 3 },
    '2': { },
    '3': { '5': 5 },
    '4': { '6': 5, '7': 9 },
    '5': { '1': 9, '7': 7 },
    '6': { '7': 8 },
    '7': { '5': 3 }
  }, '0', '7')
  t.deepEquals(path, [])
})

test('no path', t => {
  t.plan(1)
  const path = dijkstra({
    '0': { '2': 1 },
    '1': { '0': 6, '3': 8, '5': 3 },
    '2': { },
    '3': { '5': 5 },
    '4': { '6': 5, '7': 9 },
    '5': { '1': 9, '7': 7 },
    '6': { '7': 8 },
    '7': { '5': 3 }
  }, '3', '2')
  t.deepEquals(path, ['3', '5', '1', '0', '2'])
})
