'use strict'

const { Writable } = require('stream')

function ConsoleWriter (opts) {
  return new Writable({
    ...opts,
    write (chunk, encoding, done) {
      if (opts.silent !== true) {
        console.log({ chunk, encoding })
      }
      setTimeout(done, opts.time || 500) // slow simulation
    }
  })
}

module.exports = ConsoleWriter
