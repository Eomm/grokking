'use strict'

const { Writable } = require('stream')

function ConsoleWriter (opts) {
  return new Writable({
    ...opts,
    write (chunk, encoding, done) {
      console.log({ chunk, encoding })
      setTimeout(done, 500) // slow simulation
    }
  })
}

module.exports = ConsoleWriter
