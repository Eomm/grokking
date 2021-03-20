'use strict'

const suffixes = Object.freeze([undefined, 'st', 'nd', 'rd'])
module.exports = function numberToOrdinal (n) {
  if (!n) {
    return String(n)
  }
  const mod = n % 100
  const suffixSelector = mod <= 13 ? mod : mod % 10
  return String(n + (suffixes[suffixSelector] || 'th'))
}
