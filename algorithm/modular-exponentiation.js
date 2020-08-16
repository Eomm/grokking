'use strict'

/**
 * Complexity: O(log exponent)
 *
 * In strong cryptography, b is often at least 1024 bits.[1] Consider b = 5 × 1076 and e = 17,
 * both of which are perfectly reasonable values. In this example, b is 77 digits in length and
 * e is 2 digits in length, but the value be is 1,304 decimal digits in length. S
 * uch calculations are possible on modern computers, but the sheer magnitude of such numbers causes
 * the speed of calculations to slow considerably. As b and e increase even further to provide
 * better security, the value be becomes unwieldy.
 * -- from: https://en.wikipedia.org/wiki/Modular_exponentiation
 */
module.exports = function modularExponentiation (base, exponent, modulus = 0) {
  if (modulus === 1) {
    return 0
  }

  let result = 1
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus
    }
    exponent = exponent >> 1 // like /2 truncated
    base = (base * base) % modulus
  }
  return result
}
