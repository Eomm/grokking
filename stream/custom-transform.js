
'use strict'

const { Transform } = require('stream')

const transformation = new Transform({
  writableObjectMode: true,
  transform  (chunk, encoding, done) {
    this.push(chunk.toString(encoding).toUpperCase())
    done()
  }
})

require('fs')
  .createReadStream('./README.md')
  .pipe(transformation)
  .pipe(process.stdout)
