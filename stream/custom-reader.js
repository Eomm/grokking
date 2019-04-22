'use strict'

const { Readable } = require('stream')
const ConsoleWriter = require('./custom-writer')

function ArrayReader (array, opts) {
  const consumeToRead = array.slice(0)
  return new Readable({
    ...opts,
    read (size) {
      console.log({ size }) // size is equals to highWaterMark
      const element = consumeToRead.shift()
      if (element) {
        return this.push(element)
      } else {
        return this.push(null)
      }
    }
  })
}

const highWaterMark = 32768
const inStream = ArrayReader(['a', 'b', 'c'], { encoding: 'utf8', highWaterMark: highWaterMark / 2 })
const outStream = ConsoleWriter({ objectMode: true, highWaterMark })
inStream.pipe(outStream)
