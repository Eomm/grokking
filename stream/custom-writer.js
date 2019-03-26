'use strict'

const fs = require('fs')
const { Writable } = require('stream')

function ConsoleWriter (opts) {
  return new Writable({
    ...opts,
    write (chunk, encoding, done) {
      console.log(chunk.length)
      setTimeout(done, 500) // slow simulation
    }
  })
}

function tryHighWaterMark (highWaterMark) {
  const fileStream = fs.createReadStream('./file.zip') // & MB
  const outStream = ConsoleWriter({ highWaterMark })

  // start flowing
  fileStream.pipe(outStream)

  let drains = 0
  outStream.on('drain', () => drains++)
  outStream.on('finish', () => console.log(`With ${highWaterMark} highWaterMark I get ${drains} drain event`))
}

tryHighWaterMark(262144) // With 262144 highWaterMark I get 24 drain event
tryHighWaterMark(1000) // With 1000 highWaterMark I get 96 drain event
