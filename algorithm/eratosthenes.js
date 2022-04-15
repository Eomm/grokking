'use strict'

/**
 * In mathematics, the sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to any given limit.
 */

module.exports.slow = function eratosthenes (max) {
  let sieve = new Array(max - 1).fill(0).map((_, i) => i + 2)
  let pIndex = 0
  while (pIndex < sieve.length / 2) {
    const mod = sieve[pIndex++]
    sieve = sieve.filter(function remover (n) {
      return n === mod || n % mod !== 0
    })
  }
  return sieve
}

module.exports.fast = function eratosthenes (max) {
  const sqrt = Math.sqrt(max)
  const sieve = new Array(max).fill(0)

  for (let primeCandidate = 2; primeCandidate < sqrt; primeCandidate++) {
    if (sieve[primeCandidate] === true) {
      continue // already processed
    }
    for (let multiple = primeCandidate * primeCandidate; multiple < max; multiple += primeCandidate) {
      if (sieve[multiple] === 0) {
        sieve[multiple] = true
      }
    }
  }

  return sieve
    .map((isPrime, i) => ({ i, isPrime })) // find the number associated with the index
    .filter(({ i, isPrime }) => isPrime === 0 && i >= 2) // remove not prime numbers
    .map(({ i }) => i) // output only the values
}
