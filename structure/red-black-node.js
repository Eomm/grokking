'use strict'

const COLOR = { red: 1, black: 0 }

function RBNode (value) {
  this.color = COLOR.red
  this.value = value
  this.parent = null
  this.left = null
  this.right = null
}

RBNode.prototype.isRed = function () { return this.color === COLOR.red }
RBNode.prototype.isBlack = function () { return this.color === COLOR.black }
RBNode.prototype.flipColor = function () { this.color = this.isRed() ? COLOR.black : COLOR.red }

RBNode.prototype.isRight = function () { return this === (this.parent && this.parent.right) }
RBNode.prototype.isLeft = function () { return this === (this.parent && this.parent.left) }

RBNode.prototype.sibling = function () {
  if (!this.parent) { return null }

  const isLeft = this === this.parent.left
  if (isLeft) {
    return this.parent.right
  }
  return this.parent.left
}

RBNode.prototype.add = function (value) {
  if (!value && value !== 0) { return }

  if (this.value === undefined) {
    this.value = value
    return this
  }

  if (value < this.value) {
    if (this.left == null) {
      this.left = new RBNode(value)
      this.left.parent = this
      return this.left
    } else {
      return this.left.add(value)
    }
  } else {
    if (this.right == null) {
      this.right = new RBNode(value)
      this.right.parent = this
      return this.right
    } else {
      return this.right.add(value)
    }
  }
}

RBNode.prototype.toString = function (deep = 1) {
  return `${this.isRed() ? 'RED' : 'BLK'} [${this.value}]
  ${'\t'.repeat(deep)}RIGHT: ${this.right && this.right.toString(deep + 1)}
  ${'\t'.repeat(deep)}LEFT: ${this.left && this.left.toString(deep + 1)}`
}

module.exports = RBNode
