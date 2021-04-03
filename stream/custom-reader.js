'use strict'

const { Readable } = require('stream')

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

module.exports = ArrayReader
