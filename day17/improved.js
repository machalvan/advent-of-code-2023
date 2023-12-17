import '../utils.js'

const getAllAllowedPaths = (graph, r, c, endR, endC, part1 = true) => {
  let pq = [[0, r, c, -1, 0]]

  let memo = {}
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0])
    let [dist, cr, cc, dir, forward] = pq.shift()

    if (memo[[cr, cc, dir, forward]]) continue
    memo[[cr, cc, dir, forward]] = dist

    for (let [neighbor, val] of Object.entries(graph[[cr, cc]])) {
      let [nc, nr] = neighbor.split(',').toNums()
      let [weight, nDir] = val
      let nDist = dist + weight
      let nForward = nDir === dir ? forward + 1 : 1
      let oppDir = (nDir + 2) % 4

      if (dir === oppDir) continue

      if (part1) {
        if (nForward > 3) continue
      } else {
        if (nForward > 10) continue
        if (forward < 4 && nDir !== dir && dir !== -1) continue
        if (nc === endC && nr >= endR - 4 && nForward + (endR - nr) < 4)
          continue
        if (nr === endR && nc >= endC - 4 && nForward + (endC - nc) < 4)
          continue
      }

      pq.push([nDist, nc, nr, nDir, nForward])
    }
  }

  return memo
}

export const part1 = input => {
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

  let endR = grid.length - 1
  let endC = grid[0].length - 1
  let memo = getAllAllowedPaths(graph, 0, 0, endR, endC)

  let res = Infinity
  for (let [pos, val] of Object.entries(memo)) {
    let [nc, nr] = pos.split(',').toNums()

    if (nc === endC && nr === endR) {
      res = Math.min(res, val)
    }
  }

  return res
}

export const part2 = input => {
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

  let endR = grid.length - 1
  let endC = grid[0].length - 1
  let memo = getAllAllowedPaths(graph, 0, 0, endR, endC, false)

  let res = Infinity
  for (let [pos, val] of Object.entries(memo)) {
    let [c, r] = pos.split(',').toNums()

    if (c === endC && r === endR) {
      res = Math.min(res, val)
    }
  }

  return res
}
