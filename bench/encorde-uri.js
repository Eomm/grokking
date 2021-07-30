'use strict'

const bench = require('fastbench')
const encodeUrl = require('encodeurl')

const str = 'https://ru.wikipedia.org/wiki/Ленин,_Владимир_Ильич'

const run = bench([
  function module (done) {
    encodeUrl(str + Math.random())
    process.nextTick(done)
  },
  function native (done) {
    encodeURI(str + Math.random())
    process.nextTick(done)
  }
], 1000)

// run them two times
run(run.bind(null, run))
