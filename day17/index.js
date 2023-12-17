require('../utils')()

const getAllAllowedPaths = (graph, start, end, isPart1 = true) => {
  const pq = [{ node: start, distance: 0, dir: '', straights: 0 }]

  let memo = {}
  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance)
    const {
      node: current,
      distance: currentDistance,
      dir: currentDir,
      straights: currentStraights
    } = pq.shift()

    if (memo[[current, currentDir, currentStraights]]) continue

    memo[[current, currentDir, currentStraights]] = currentDistance

    for (const [neighbor, val] of Object.entries(graph[current])) {
      const [weight, dir] = val
      const newDistance = currentDistance + weight
      const newStraights = dir === currentDir ? currentStraights + 1 : 1

      let oppDir = { N: 'S', S: 'N', E: 'W', W: 'E' }[dir]

      if (isPart1) {
        if (newStraights <= 3 && currentDir !== oppDir) {
          pq.push({
            node: neighbor,
            distance: newDistance,
            dir,
            straights: newStraights
          })
        }
      } else {
        if (newStraights <= 10 && currentDir !== oppDir) {
          let leftTurn = { N: 'W', S: 'E', E: 'N', W: 'S' }[currentDir]
          let rightTurn = { N: 'E', S: 'W', E: 'S', W: 'N' }[currentDir]

          if (!(currentStraights < 4 && [leftTurn, rightTurn].includes(dir))) {
            let [nx, ny] = neighbor.split(',').map(n => +n)

            if (
              nx < end[0] ||
              ny < end[1] - 4 ||
              newStraights + (end[1] - ny) >= 4
            ) {
              if (
                ny < end[1] ||
                nx < end[0] - 4 ||
                newStraights + (end[0] - nx) >= 4
              ) {
                pq.push({
                  node: neighbor,
                  distance: newDistance,
                  dir,
                  straights: newStraights
                })
              }
            }
          }
        }
      }
    }
  }

  return memo
}

const part1 = input => {
  let grid = input.toGrid()
  let graph = {}

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      graph[[c, r]] ??= {}
      grid.forEachAdjacent(c, r, ({ x, y, cell, dir }) => {
        graph[[c, r]][[x, y]] = [+cell, dir]
      })
    }
  }

  let start = [0, 0].toString()
  let end = [grid[0].length - 1, grid.length - 1]
  let memo = getAllAllowedPaths(graph, start, end)

  let res = Infinity
  for (let [pos, val] of Object.entries(memo)) {
    let [x, y] = pos.split(',')
    if (+x === grid[0].length - 1 && +y === grid.length - 1) {
      res = Math.min(res, val)
    }
  }

  return res
}

const part2 = input => {
  let grid = input.toGrid()
  let graph = {}

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      graph[[c, r]] ??= {}
      grid.forEachAdjacent(c, r, ({ x, y, cell, dir }) => {
        graph[[c, r]][[x, y]] = [+cell, dir]
      })
    }
  }

  let start = [0, 0].toString()
  let end = [grid[0].length - 1, grid.length - 1]
  let memo = getAllAllowedPaths(graph, start, end, false)

  let res = Infinity
  for (let [pos, val] of Object.entries(memo)) {
    let [x, y] = pos.split(',')
    if (+x === grid[0].length - 1 && +y === grid.length - 1) {
      res = Math.min(res, val)
    }
  }

  return res
}

module.exports = { part1, part2 }
