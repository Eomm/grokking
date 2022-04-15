'use strict'

const { test } = require('tap')

test('sync finally', t => {
  t.plan(3)
  let sequence = 0
  try {
    sequence++
    throw new Error('test')
  } catch (error) {
    t.equal(sequence++, 1, 'catch')
  } finally {
    t.equal(sequence++, 2, 'finally')
  }
  t.equal(sequence++, 3, 'end')
})

test('sync finally without catch', t => {
  t.plan(2)
  t.throws(() => {
    let sequence = 0
    try {
      sequence++
      throw new Error('test')
    } finally {
      t.equal(sequence++, 1, 'finally')
    }
  })
})

test('sync finally swallow error without catch', t => {
  t.plan(1)
  let sequence = 0
  try {
    sequence++
    throw new Error('test')
  } finally {
    t.equal(sequence++, 1, 'finally')
    return 'done'
  }
})

test('sync finally rethrows error', t => {
  t.plan(3)
  t.throws(() => {
    let sequence = 0
    try {
      sequence++
      throw new Error('test')
    } catch (err) {
      t.equal(sequence++, 1, 'catch')
      throw err
    } finally {
      t.equal(sequence++, 2, 'finally')
    }
  })
})

test('sync finally throws error', t => {
  t.plan(2)
  t.throws(() => {
    let sequence = 0
    try {
      sequence++
    } finally {
      t.equal(sequence++, 1, 'finally')
      throw new Error('test')
    }
  })
})

test('sync finally manage error', t => {
  t.plan(2)
  let sequence = 0
  try {
    sequence++
  } finally {
    t.equal(sequence++, 1, 'finally')
    try {
      throw new Error('test')
    } catch (error) {
      t.equal(sequence++, 2, 'sub catch')
    }
  }
})
