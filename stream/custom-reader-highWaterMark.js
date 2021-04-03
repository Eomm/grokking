'use strict'

const ArrayReader = require('./custom-reader')
const ConsoleWriter = require('./custom-writer')

const highWaterMark = 32768
const inStream = ArrayReader(['a', 'b', 'c'], { encoding: 'utf8', highWaterMark: highWaterMark / 2 })
const outStream = ConsoleWriter({ objectMode: true, highWaterMark })
inStream.pipe(outStream)
