const { test } = require('tap')
const polish = require('../../../games/interview/polish')
// const polishEval = require('../../../games/interview/polish-eval')

;[polish
  // polishEval
]
  .forEach(evaluate => {
    test(`Evalutate expression with ${evaluate.name}`, t => {
      t.equal(evaluate('5 1 2 + 4 * + 3 -'), 14)
      t.equal(evaluate(''), 0)
      t.equal(evaluate('1 2 3.5'), 3.5)
      t.equal(evaluate('1 3 -'), -2)
      t.end()
    })
  })
