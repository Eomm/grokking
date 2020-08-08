'use strict'

const { test } = require('tap')
const Sudoku = require('../../games/sudoku/play-sudoku')

test('9x9 at DIFFICULT level', t => {
  t.plan(2)
  const gameSet = [
    new Uint8Array([0, 0, 1, 5, 0, 0, 0, 7, 0]),
    new Uint8Array([0, 0, 4, 0, 6, 0, 0, 0, 9]),
    new Uint8Array([0, 3, 0, 0, 0, 4, 0, 0, 0]),
    new Uint8Array([6, 2, 0, 0, 0, 5, 1, 0, 0]),
    new Uint8Array([0, 4, 0, 0, 0, 0, 5, 2, 0]),
    new Uint8Array([0, 0, 0, 0, 4, 8, 0, 0, 3]),
    new Uint8Array([4, 1, 0, 0, 7, 0, 0, 0, 0]),
    new Uint8Array([0, 0, 6, 8, 0, 0, 0, 0, 1]),
    new Uint8Array([8, 0, 0, 0, 0, 9, 0, 3, 0])
  ]

  const sudoku = new Sudoku({ squareRegion: 3 })
  const solved = sudoku.play(gameSet)

  t.deepEquals(solved, [9, 6, 1, 5, 8, 3, 4, 7, 2, 2, 8, 4, 1, 6, 7, 3, 5, 9, 5, 3, 7, 9, 2, 4, 8, 1, 6, 6, 2, 8, 7, 3, 5, 1, 9, 4, 7, 4, 3, 6, 9, 1, 5, 2, 8, 1, 9, 5, 2, 4, 8, 7, 6, 3, 4, 1, 9, 3, 7, 6, 2, 8, 5, 3, 7, 6, 8, 5, 2, 9, 4, 1, 8, 5, 2, 4, 1, 9, 6, 3, 7])

  const print = sudoku.printable()
  t.equals(print, '961|583|472|\n284|167|359|\n537|924|816|\n-----------|\n628|735|194|\n743|691|528|\n195|248|763|\n-----------|\n419|376|285|\n376|852|941|\n852|419|637|\n-----------|\n')
})

test('4x4', t => {
  t.plan(2)
  const gameSet = [
    new Uint8Array([0, 0, 0, 0]),
    new Uint8Array([1, 4, 0, 0]),
    new Uint8Array([0, 0, 2, 1]),
    new Uint8Array([0, 0, 0, 0])
  ]

  const sudoku = new Sudoku({ squareRegion: 2 })
  const solved = sudoku.play(gameSet)

  t.deepEquals(solved, [3, 2, 1, 4, 1, 4, 3, 2, 4, 3, 2, 1, 2, 1, 4, 3])

  const print = sudoku.printable()
  t.equals(print, '32|14|\n14|32|\n------|\n43|21|\n21|43|\n------|\n')
})
