'use strict'

const { test } = require('tap')

test('clone object', t => {
  t.plan(3)

  t.test('spread operator clone only the first depth', t => {
    t.plan(2)
    const aJson = {
      hello: 'world',
      foo: {
        bar: 'bar'
      }
    }

    const cloned = { ...aJson }
    t.deepEquals(cloned, aJson)

    aJson.foo.bar = 'doo'
    t.equal(cloned.foo.bar, aJson.foo.bar)
  })

  t.test('assign clone only the first depth', t => {
    t.plan(2)
    const aJson = {
      hello: 'world',
      foo: {
        bar: 'bar'
      }
    }

    const cloned = Object.assign({}, aJson)
    t.deepEquals(cloned, aJson)

    aJson.foo.bar = 'doo'
    t.equal(cloned.foo.bar, aJson.foo.bar)
  })

  t.test('json stringify clone all', t => {
    t.plan(2)
    const aJson = {
      hello: 'world',
      foo: {
        bar: 'bar'
      }
    }

    const cloned = JSON.parse(JSON.stringify(aJson))
    t.deepEquals(cloned, aJson)

    aJson.foo.bar = 'doo'
    t.notEqual(cloned.foo.bar, aJson.foo.bar)
  })
})
