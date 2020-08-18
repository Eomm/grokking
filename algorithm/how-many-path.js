'use strict'

class Node {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.right = null
    this.up = null
  }
}

/**
 * How many paths exist to go from A to B only moving UP or RIGHT by one cell?
 */
module.exports = function howManyPath ([fromX, fromY], [toX, toY]) {
  const startPoint = new Node(fromX, fromY)
  const targetPoint = new Node(toX, toY)

  return treeCounter(startPoint, targetPoint)
}

function treeCounter (fromNode, toNode) {
  if (!fromNode) { return 0 }
  if (fromNode.x === toNode.x && fromNode.y === toNode.y) {
    return 1
  }

  let pathCounter = 0

  // can I move upper?
  if (fromNode.y < toNode.y) {
    fromNode.up = new Node(fromNode.x, fromNode.y + 1)
    pathCounter += treeCounter(fromNode.up, toNode)
  }

  // can I move on right?
  if (fromNode.x < toNode.x) {
    fromNode.right = new Node(fromNode.x + 1, fromNode.y)
    pathCounter += treeCounter(fromNode.right, toNode)
  }

  return pathCounter
}
