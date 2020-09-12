'use strict'

const { test } = require('tap')
const RBTree = require('../../structure/red-black-tree')

test('Insertion', t => {
  test('Case 1: uncle is red and it doesn\'t matter left children', t => {
    const tree = new RBTree()
    tree.add(4)
    tree.add(5)
    tree.add(3)
    tree.add(1)

    const { root } = tree
    t.equal(root.value, 4)
    t.ok(root.isBlack())

    t.equal(root.right.value, 5)
    t.ok(root.right.isBlack())

    t.equal(root.left.value, 3)
    t.ok(root.left.isBlack())

    t.equal(root.left.left.value, 1)
    t.ok(root.left.left.isRed())
    t.end()
  })

  test('Case 1: uncle is red and it doesn\'t matter right children', t => {
    const tree = new RBTree()
    tree.add(4)
    tree.add(5)
    tree.add(3)
    tree.add(3)

    const { root } = tree
    t.equal(root.value, 4)
    t.ok(root.isBlack())

    t.equal(root.right.value, 5)
    t.ok(root.right.isBlack())

    t.equal(root.left.value, 3)
    t.ok(root.left.isBlack())

    t.equal(root.left.right.value, 3)
    t.ok(root.left.right.isRed())
    t.end()
  })

  test('Case 2-A: new node and parent are both left children', t => {
    const tree = new RBTree()
    tree.add(4)
    tree.add(3)
    tree.add(2)

    const { root } = tree
    t.equal(root.value, 3)
    t.ok(root.isBlack())

    t.equal(root.right.value, 4)
    t.ok(root.right.isRed())

    t.equal(root.left.value, 2)
    t.ok(root.right.isRed())

    t.end()
  })

  test('Case 2-B: new node is right and parent is left child', t => {
    const tree = new RBTree()
    tree.add(4)
    tree.add(1)
    tree.add(3)

    const { root } = tree
    t.equal(root.value, 3)
    t.ok(root.isBlack())

    t.equal(root.right.value, 4)
    t.ok(root.right.isRed())

    t.equal(root.left.value, 1)
    t.ok(root.right.isRed())

    t.end()
  })

  test('Case 2-C: new node and parent is right children', t => {
    const tree = new RBTree()
    tree.add(4)
    tree.add(5)
    tree.add(6)

    const { root } = tree
    t.equal(root.value, 5)
    t.ok(root.isBlack())

    t.equal(root.right.value, 6)
    t.ok(root.right.isRed())

    t.equal(root.left.value, 4)
    t.ok(root.right.isRed())

    t.end()
  })

  test('Case 2-D: new node is left and parent is right child', t => {
    const tree = new RBTree()
    tree.add(4)
    tree.add(6)
    tree.add(5)

    const { root } = tree
    t.equal(root.value, 5)
    t.ok(root.isBlack())

    t.equal(root.right.value, 6)
    t.ok(root.right.isRed())

    t.equal(root.left.value, 4)
    t.ok(root.right.isRed())

    t.end()
  })

  t.end()
})

test('Retrievals', { todo: 1 }, t => {})
test('Deletions', { todo: 1 }, t => {})

test('Big tree evaluation', t => {
  const tree = new RBTree()

  const points = [24, 18, 85, 87, 20, 92, 74, 56, 8, 70, 59, 77, 6, 87, 5, 92]
  points.forEach(p => tree.add(p))

  const { root } = tree

  checkNode(root, 74, 'black')

  checkNode(root.right, 87, 'black')
  checkNode(root.right.left, 85, 'black')
  checkNode(root.right.left.left, 77, 'red')
  t.notOk(root.right.left.right)
  checkNode(root.right.right, 92, 'black')
  checkNode(root.right.right.right, 92, 'red')
  checkNode(root.right.right.left, 87, 'red')

  checkNode(root.left, 24, 'black')
  checkNode(root.left.left, 18, 'red')
  checkNode(root.left.left.left, 6, 'black')
  checkNode(root.left.left.left.left, 5, 'red')
  checkNode(root.left.left.left.right, 8, 'red')
  checkNode(root.left.left.right, 20, 'black')
  checkNode(root.left.right, 59, 'black')
  checkNode(root.left.right.right, 70, 'red')
  checkNode(root.left.right.left, 56, 'red')

  t.end()

  function checkNode (node, value, color) {
    t.equal(node.value, value)
    if (color === 'red') {
      t.ok(node.isRed())
    } else {
      t.ok(node.isBlack())
    }
  }
})
