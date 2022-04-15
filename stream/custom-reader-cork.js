'use strict'

const ConsoleWriter = require('./custom-writer')

const outStream = ConsoleWriter({
  objectMode: true,
  highWaterMark: 512,
  // silent: true,
  time: 1
})

let stressTest = 0

function stressIt () {
  while (stressTest < 10000000000) {
    const shouldContinue = outStream.write(Buffer.from('hello'))
    stressTest++
    if (!shouldContinue) {
      console.log(`pausing at ${stressTest}... wait for it`)
      outStream.once('drain', () => {
        console.log('drain!')
        stressIt()
      })
      break
    }
  }
}

outStream.cork() // the write will not execute any `write` call till uncork is called

stressIt()

setTimeout(function () {
  outStream.uncork()
}, 5000)
