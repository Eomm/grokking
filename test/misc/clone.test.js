'use strict'

const { test } = require('tap')

test('clone object', t => {
  t.plan(5)

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

  t.test('object create clone only prototype and properties - function', t => {
    t.plan(3)
    function afunc () {
      this.hello = 'world'
    }

    afunc.prototype.sayHi = function () {
      console.log(this.hello)
    }

    const cloned = Object.create(afunc)
    t.equals(cloned.hello, afunc.hello)

    afunc.hello = 'ciao'
    t.equals(cloned.hello, afunc.hello)

    cloned.hello = 'hola'
    t.notEquals(cloned.hello, afunc.hello)
  })

  t.test('object create clone only prototype and properties - json', t => {
    t.plan(3)
    const aJson = {
      hello: 'world',
      foo: {
        bar: 'bar'
      }
    }

    const cloned = Object.create(aJson)
    t.deepEquals({}, cloned)

    cloned.hello = 'universe'
    aJson.foo.bar = 'doo'
    t.equal(cloned.foo.bar, aJson.foo.bar)
    t.notEqual(cloned.hello, aJson.hello)
  })
})
