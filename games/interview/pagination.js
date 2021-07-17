// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper (collection, itemsPerPage) {
  this.array = collection
  this.ipp = itemsPerPage
}

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function () {
  return this.array.length
}

// returns the number of pages
PaginationHelper.prototype.pageCount = function () {
  return Math.ceil(this.array.length / this.ipp)
}

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function (pageIndex) {
  const pages = this.pageCount()
  if (pageIndex < 0 || pageIndex >= pages) {
    return -1
  }

  if (pageIndex === pages - 1) {
    // last page
    return this.array.length % this.ipp
  } else {
    return this.ipp
  }
}

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function (itemIndex) {
  if (itemIndex < 0 || itemIndex >= this.array.length) {
    return -1
  }
  return Math.max(0, Math.ceil(itemIndex / this.ipp) - 1) // 0-index
}

module.exports = PaginationHelper
