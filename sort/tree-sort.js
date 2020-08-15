'use strict'

/**
 * Worse: O(n²)
 * Average: O(log n)
 */

module.exports = function treeSort (unordered) {
  if (unordered.length < 2) { return unordered }

  const root = new Node()
  for (const item of unordered) {
    root.add(item)
  }
  return collapseTree(root)
}

function Node (value) {
  this.value = value
  this.left = null
  this.right = null
}

Node.prototype.add = function (value) {
  if (!value && value !== 0) { return }

  if (this.value === undefined) {
    this.value = value
    return
  }

  if (value <= this.value) {
    if (this.left == null) {
      this.left = new Node(value)
    } else {
      this.left.add(value)
    }
  } else {
    if (this.right == null) {
      this.right = new Node(value)
    } else {
      this.right.add(value)
    }
  }
}

function collapseTree (node) {
  const leftBranch = node.left ? collapseTree(node.left) : []
  const rightBranch = node.right ? collapseTree(node.right) : []
  return [...leftBranch, node.value, ...rightBranch]
}
