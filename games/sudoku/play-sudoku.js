'use strict'

module.exports = Sudoku

/**
 * Right now this solver is designed to solve squared SUDOKU
 * TODO:
 * - impossible game
 * - Go Doku 5x5 region 5
 * - Sudoku the Giant 25x25 region 5
 * - Sudoku-zilla 100x100 region 10
 */

function Sudoku (opts = {}) {
  // TODO support different sudoku types
  this.region = opts.squareRegion || 3 // default classic
}

Sudoku.prototype.play = function (gameSet) {
  const allCells = buildCellStructure(gameSet, this.region)

  this.valueSet = Array(gameSet[0].length).fill(0).map((_, i) => (i + 1))

  // to reduce the calculation, we can just ignore the default game cells
  const cells = allCells.filter(c => c.init === 0)
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]

    if (!solveCell.call(this, cell)) {
      cell.history.clear() // out tries are invalid

      let backTrack = i - 1
      for (; backTrack >= 0; backTrack--) {
        if (assignValue.call(this, cells[backTrack], 0)) {
          break
        }
      }
      i = backTrack - 1
    }
  }

  this.lastGame = gameSet
  this.lastResult = allCells.map(_ => _.value)
  return this.lastResult
}

function solveCell (cell) {
  const chooseNewValue = chooseValue.call(this, cell)
  if (chooseNewValue === 0) {
    return false
  }
  assignValue.call(this, cell, chooseNewValue)
  return true
}

function assignValue (cell, value) {
  cell.rows[cell.x] = value
  cell.columns[cell.y] = value
  cell.square[(cell.x % this.region) + ((cell.y % this.region) * this.region)] = value
  cell.value = value

  if (value > 0) {
    cell.history.add(value)
  }
  return true
}

Sudoku.prototype.printable = function (result) {
  const print = result || this.lastResult
  if (!print) {
    // nothing to print
    return
  }

  return print.flatMap((val, i) => {
    if ((i + 1) % this.region === 0) {
      if ((i + 1) % (this.region ** 2) === 0) {
        if ((i + 1) % (this.region ** 3) === 0) {
          return [val, '|', '\n', '-'.repeat(this.region ** 2), '--|\n']
        } else {
          return [val, '|', '\n']
        }
      } else {
        return [val, '|']
      }
    }
    return val
  }).join('')
}

function chooseValue (cell) {
  const values = this.valueSet
    .filter(_ => !cell.rows.includes(_))
    .filter(_ => !cell.columns.includes(_))
    .filter(_ => !cell.square.includes(_))
    .filter(_ => !cell.history.has(_))
  if (values.length === 0) {
    return 0
  }
  // stochastic hope
  return values[Math.floor(Math.random() * values.length)]
}

function buildCellStructure (gameSet, squareLength) {
  const cells = []

  const columnMap = new Map()
  const squareMap = new Map()

  gameSet.forEach((row, y) => {
    row.forEach((cellValue, x) => {
      if (!columnMap.has(x)) {
        columnMap.set(x, [])
      }
      columnMap.get(x).push(cellValue)

      const squareId = `${Math.floor(x / squareLength)}-${Math.floor(y / squareLength)}`
      if (!squareMap.has(squareId)) {
        squareMap.set(squareId, [])
      }
      squareMap.get(squareId).push(cellValue)

      cells.push({
        x,
        y,
        value: cellValue,
        init: cellValue,
        rows: row,
        columns: columnMap.get(x),
        squareId,
        square: squareMap.get(squareId),
        history: new Set(),
        iter: 0
      })
    })
  })

  return cells
}
