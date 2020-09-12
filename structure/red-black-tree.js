'use strict'

/**
 * Red-Black Tree is an ordered tree that ensure:
 * Insertion: O(log n)
 * Retrievals: O(log n)
 * Deletions: O(log n)
 *
 * Rules:
 * 1- Every node is red or black
 * 2- The root is black
 * 3- The leaves are black ones with null values
 * 4- Every red node must have 2 black children
 * 5- Every path from a node to its leaves must have the same number of black children
 */

const Node = require('./red-black-node')

function RBTree () {
  this.root = new Node()
}

RBTree.prototype.add = function (value) {
  const insertedNode = this.root.add(value)
  applyTreeRules.call(this, insertedNode)
  if (this.root.isRed()) {
    // 2- The root is black
    this.root.flipColor()
  }
}

RBTree.prototype.remove = function (value) {
  // TODO
}

RBTree.prototype.search = function (value) {
  // TODO
  // https://github.com/Eomm/choose-it#choose-it
}

RBTree.prototype.toString = function () {
  return this.root.toString()
}

module.exports = RBTree

function applyTreeRules (insertedNode) {
  if (insertedNode.parent) {
    if (insertedNode.isRed() && insertedNode.parent.isRed()) {
      const uncle = insertedNode.parent.sibling()

      if (uncle && uncle.isRed()) {
        // Case 1: uncle is red and it doesn't matter left or right children
        uncle.flipColor()
        uncle.parent.flipColor()
        insertedNode.parent.flipColor()

        // check that the switch does't not add red-red nodes
        applyTreeRules.call(this, uncle.parent)
        //
      } else if (!uncle || uncle.isBlack()) {
        //
        const isNodeLeft = insertedNode.isLeft()
        const isParentLeft = insertedNode.parent.isLeft()

        if (isNodeLeft && isParentLeft) {
          // Case 2-A: new node and parent are both left children
          const g = insertedNode.parent.parent
          const p = insertedNode.parent

          p.parent = g.parent
          if (p.parent) { p.parent.left = p }
          g.parent = p
          g.left = p.right
          p.right = g

          g.flipColor()
          p.flipColor()

          if (this.root === g) { this.root = p }
        } else if (!isNodeLeft && isParentLeft) {
          // Case 2-B: new node is right and parent is left child
          const g = insertedNode.parent.parent // grandparent
          const p = insertedNode.parent // parent
          const n = insertedNode // nephew

          p.right = n.left
          if (p.right) { p.right.parent = p }

          g.left = n.right
          if (g.left) { g.left.parent = g }

          n.parent = g.parent
          if (n.parent) { n.parent.left = n }
          n.right = g
          n.left = p

          p.parent = n
          g.parent = n

          n.flipColor()
          g.flipColor()

          if (this.root === g) { this.root = n }
        } else if (!isNodeLeft && !isParentLeft) {
          // Case 2-C: new node and parent is right children
          const g = insertedNode.parent.parent
          const p = insertedNode.parent

          p.parent = g.parent
          if (p.parent) { p.parent.right = p }
          g.parent = p
          g.right = p.left
          p.left = g

          g.flipColor()
          p.flipColor()

          if (this.root === g) { this.root = p }
        } else if (isNodeLeft && !isParentLeft) {
          // Case 2-D: new node is left and parent is right child
          const g = insertedNode.parent.parent // grandparent
          const p = insertedNode.parent // parent
          const n = insertedNode // nephew

          g.right = n.left
          if (g.right) { g.right.parent = g }

          p.left = n.right
          if (p.left) { p.left.parent = p }

          n.parent = g.parent
          if (n.parent) { n.parent.right = n }
          n.right = p
          n.left = g

          p.parent = n
          g.parent = n

          n.flipColor()
          g.flipColor()

          if (this.root === g) { this.root = n }
        }
      }
    }
  }
}
