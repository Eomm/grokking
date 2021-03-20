'use strict'

const BASE64_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

module.exports = function toBase64 (str) {
  const base64Groups = { base64: [], rest: '' }

  Buffer.from(str, 'ascii')
    .reduce(group8bitTo6bit, base64Groups)

  if (base64Groups.rest) {
    const restChar = get6BitStringPadded(base64Groups.rest)
    base64Groups.base64.push(parseInt(restChar, 2))
    base64Groups.rest = ''
  }

  // add padding
  while (base64Groups.base64.length % 4 !== 0) {
    base64Groups.base64.push(64)
  }

  return base64Groups.base64
    .map(sixtestInt => BASE64_TABLE[sixtestInt])
    .join('')
}

function group8bitTo6bit (acc, integer) {
  const binaryStr = get8BitString(integer)

  let howMuch = 6 - acc.rest.length
  if (howMuch === 0) {
    acc.base64.push(parseInt(acc.rest, 2))
    acc.rest = ''
    howMuch = 6
  }
  const piece = binaryStr.substr(0, howMuch)

  const sixtets = `${acc.rest}${piece}`
  acc.base64.push(parseInt(sixtets, 2))
  acc.rest = binaryStr.substr(howMuch)

  return acc
}

function get8BitString (integer) {
  return getBitString(integer, 8, true)
}

function get6BitStringPadded (integer) {
  return getBitString(integer, 6, false)
}

function getBitString (integer, bit, leftPad = true) {
  let binary = integer.toString(2)
  if (binary.length < bit) {
    const padding = '0'.repeat(bit - binary.length)
    binary = leftPad ? padding + binary : binary + padding
  }
  return binary
}
