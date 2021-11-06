'use strict'

/* eslint no-proto: "off" */

const { test } = require('tap')

test('json', t => {
  const obj = {}
  t.notOk(obj.prototype, 'the prototype does not exist')
  t.ok(obj.__proto__, 'the __proto__ exists')

  const original = obj.__proto__.toString
  let infect = false
  obj.__proto__.toString = () => {
    infect = true
    return original()
  }

  console.log(`${obj}`) // trigger the toString
  t.ok(infect, 'the toString has been hijacted')
  t.end()
})

test('create empty', t => {
  const obj = Object.create({})
  t.notOk(obj.prototype, 'the prototype does not exist')
  t.ok(obj.__proto__, 'the __proto__ exists')

  const original = obj.__proto__.toString
  let infect = false
  obj.__proto__.toString = () => {
    infect = true
    return original()
  }

  console.log(`${obj}`) // trigger the toString
  t.ok(infect, 'the toString has been hijacted')
  t.end()
})

test('create', t => {
  const obj = Object.create(null)
  t.notOk(obj.prototype, 'the prototype does not exist')
  t.notOk(obj.__proto__, 'the __proto__ does not exist')
  t.end()
})

test('looping', t => {
  const obj = { a: 1 }
  t.notOk(obj.prototype, 'the prototype does not exists')
  t.ok(obj.__proto__, 'the __proto__ exists')

  // hack
  obj.__proto__.b = 2

  const data = ['a', 'b']
  for (const k in obj) {
    t.equal(k, data.shift(), 'iterating the prototype')
  }

  t.same(Object.keys(obj), ['a'], 'keys does not iterate the prototype')
  t.same(Object.values(obj), [1], 'values does not iterate the prototype')

  t.end()
})
