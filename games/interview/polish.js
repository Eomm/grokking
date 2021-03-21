// This solution avoid to use `eval` for security issue
'use strict'

const regExNum = /\d[.]?\d{0,}/g
const regExLastNum = /\d[.]?\d{0,}$/g
const regExOperators = /[+*\-/]/

const operationSupported = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b,
  '*': (a, b) => a * b
}

// https://en.wikipedia.org/wiki/Polish_notation
module.exports = function calculate (expression) {
  const stack = []
  while (expression !== '') {
    expression = stakify(expression)
  }
  return stack.pop() || 0

  function stakify (str) {
    const indexNextOperator = str.search(regExOperators)
    if (indexNextOperator === -1) {
      // if I don't have operator, I must add the last number to the stack and exit
      const numbers = (expression.match(regExLastNum) || []).map(parseFloat)
      stack.push(numbers.length === 1 ? numbers.pop() : 0)
      return ''
    }

    const operator = str.charAt(indexNextOperator)
    const analyzeNumbers = str.substring(0, indexNextOperator)
    const numbers = (analyzeNumbers.match(regExNum) || []).map(parseFloat)
    const numbersFound = numbers.length

    let first
    let second
    if (numbersFound >= 2) {
      numbers.slice(0, numbersFound - 2).forEach((num) => { stack.push(num) })
      second = numbers.pop()
      first = numbers.pop()
    } else if (numbersFound === 1) {
      first = stack.pop()
      second = numbers.pop()
    } else {
      // assuming all expressions are valid
      second = stack.pop()
      first = stack.pop()
    }
    stack.push(executeOperation(first, second, operator))
    return str.substring(indexNextOperator + 2)
  }
}

function executeOperation (numA, numB, strOperator) {
  return operationSupported[strOperator](numA, numB)
}
