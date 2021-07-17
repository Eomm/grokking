'use strict'

const { test } = require('tap')
const PaginationHelper = require('../../../games/interview/pagination')

test('pagination unit test', t => {
  t.plan(9)
  const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const helper = new PaginationHelper(collection, 10)
  t.equal(helper.pageIndex(23), 2)
  t.equal(helper.itemCount(), 24)
  t.equal(helper.pageItemCount(0), 10)
  t.equal(helper.pageItemCount(2), 4)
  t.equal(helper.pageItemCount(3), -1)

  t.equal(helper.pageIndex(5), 0)
  t.equal(helper.pageIndex(12), 1)
  t.equal(helper.pageIndex(25), -1)
  t.equal(helper.pageIndex(-10), -1)
})
