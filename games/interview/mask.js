'use strict'

const groupMatch = /^(.)((?:.*)\d*(?:.*))(.{4})$/m

module.exports = function maskify (creditCard) {
  if (!creditCard || creditCard.length < 6) {
    return creditCard
  }
  const matches = creditCard.match(groupMatch)
  if (!matches) {
    return creditCard
  }
  const firstChar = matches[1]
  const mask = matches[2].replace(/\d/g, '#')
  const lastFour = matches[3]
  return `${firstChar}${mask}${lastFour}`
}
