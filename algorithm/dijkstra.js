'use strict'

/**
 * Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm
 * for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.
 */
module.exports = dijkstra

function dijkstra (graph, startNode, endNode) {
  const costsTable = new Map()

  // compose the "visited" map with info for each node
  Object.keys(graph).forEach(nodeId => {
    costsTable.set(nodeId, {
      nodeId,
      node: graph[nodeId],
      visited: false,
      cost: nodeId === startNode ? 0 : Infinity,
      path: false
    })
  })

  let nodeId = startNode
  do {
    visit(nodeId, costsTable.get(nodeId).cost)
    nodeId = findLowestCostNotVisitedNode()
  } while (nodeId)

  if (costsTable.get(endNode).cost === Infinity) {
    // there is no path to the end
    return []
  }

  const path = [endNode]
  let walk = endNode
  do {
    walk = costsTable.get(walk).path
    if (walk) {
      path.push(walk)
    }
  } while (walk)
  return path.reverse()

  function visit (nodeId, cost) {
    const nodeInfo = costsTable.get(nodeId)
    nodeInfo.visited = true
    nodeInfo.cost = cost

    const { node } = nodeInfo
    Object.keys(node)
      .map(getInfo)
      .filter(onlyNotVisited)
      .forEach(function updateCost (nodeInfoChild) {
        const possibleNewCost = node[nodeInfoChild.nodeId] + cost
        if (nodeInfoChild.cost > possibleNewCost) {
          nodeInfoChild.cost = possibleNewCost
          nodeInfoChild.path = nodeId
        }
      })
  }

  function findLowestCostNotVisitedNode () {
    let cheapestUnknownVertex
    let cheapestCost = Infinity
    costsTable.forEach(function findLowest (nodeInfo, nodeId) {
      if (nodeInfo.visited === false && nodeInfo.cost < cheapestCost) {
        cheapestCost = nodeInfo.cost
        cheapestUnknownVertex = nodeId
      }
    })
    return cheapestUnknownVertex
  }

  function getInfo (nodeId) {
    return costsTable.get(nodeId)
  }
}

function onlyNotVisited (nodeInfo) {
  return nodeInfo.visited === false
}
