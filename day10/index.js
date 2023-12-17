require('../utils')()

const next = (grid, cur, fromDir, path = []) => {
  let [x, y] = cur

  let newTile
  if (fromDir === 0) newTile = [x, y - 1]
  if (fromDir === 1) newTile = [x + 1, y]
  if (fromDir === 2) newTile = [x, y + 1]
  if (fromDir === 3) newTile = [x - 1, y]

  let nx = newTile[0]
  let ny = newTile[1]
  let nextChar = grid[ny][nx]

  if (nextChar === 'S' && path.length) return path.concat([cur])

  if (path.find(([px, py]) => px === nx && py === ny)) return

  let dir = 0
  if (nextChar === 'F' && fromDir === 0) dir = 1
  if (nextChar === 'F' && fromDir === 3) dir = 2
  if (nextChar === '7' && fromDir === 1) dir = 2
  if (nextChar === '7' && fromDir === 0) dir = 3
  if (nextChar === 'J' && fromDir === 2) dir = 3
  if (nextChar === 'J' && fromDir === 1) dir = 0
  if (nextChar === 'L' && fromDir === 3) dir = 0
  if (nextChar === 'L' && fromDir === 2) dir = 1
  if (nextChar === '|' && fromDir === 0) dir = 0
  if (nextChar === '|' && fromDir === 2) dir = 2
  if (nextChar === '-' && fromDir === 1) dir = 1
  if (nextChar === '-' && fromDir === 3) dir = 3

  return next(grid, [nx, ny], dir, path.concat([cur]))
}

const part1 = input => {
  let grid = input.toGrid()

  let S
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'S') {
        S = [j, i]
      }

      if (S) break
    }

    if (S) break
  }

  let dir
  grid.forEachAdjacent(S[0], S[1], ({ cell, dir: fromDir }) => {
    if (dir !== undefined) return
    if (fromDir === 0 && ['|', '7', 'F'].includes(cell)) dir = 0
    if (fromDir === 1 && ['-', 'J', '7'].includes(cell)) dir = 1
    if (fromDir === 2 && ['|', 'J', 'L'].includes(cell)) dir = 2
    if (fromDir === 3 && ['-', 'L', 'F'].includes(cell)) dir = 3
  })

  return next(grid, S, dir).length / 2
}

const checkIfOutside = (grid, cur, loop) => {
  let [i, j] = cur
  let pipes = []

  let ni = i - 1
  while (true) {
    let nextTile = grid[ni]?.[j]

    if (nextTile === undefined) {
      let numPipes = pipes.filter(p => p === '-').length

      if (pipes.length) {
        let counts = pipes.countAll()
        let leftCount = (counts['J'] ?? 0) + (counts['7'] ?? 0)
        let rightCount = (counts['L'] ?? 0) + (counts['F'] ?? 0)
        let tot = leftCount + rightCount
        let diff = Math.abs(leftCount - rightCount)

        numPipes += diff + (tot - diff) / 2
      }

      return numPipes % 2 === 0
    }

    if (loop.find(([pi, pj]) => pi === j && pj === ni)) {
      pipes.push(nextTile)
    }

    ni -= 1
  }
}

const part2 = input => {
  let grid = input.toGrid()

  let S
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'S') {
        S = [j, i]
      }

      if (S) break
    }

    if (S) break
  }

  let adjPipes = []
  grid.forEachAdjacent(S[0], S[1], ({ cell, dir: fromDir }) => {
    if (fromDir === 0 && ['|', '7', 'F'].includes(cell)) adjPipes.push(0)
    if (fromDir === 1 && ['-', 'J', '7'].includes(cell)) adjPipes.push(1)
    if (fromDir === 2 && ['|', 'J', 'L'].includes(cell)) adjPipes.push(2)
    if (fromDir === 3 && ['-', 'L', 'F'].includes(cell)) adjPipes.push(3)
  })

  let res = next(grid, S, adjPipes[0])

  adjPipes = adjPipes.sort()

  grid[S[1]][S[0]] = {
    '0,1': 'L',
    '1,2': 'F',
    '2,3': '7',
    '3,0': 'J'
  }[adjPipes]

  let inside = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (res.find(([pi, pj]) => pi === j && pj === i)) {
        continue
      }

      let isOutside = checkIfOutside(grid, [i, j], res)

      if (isOutside) continue

      inside++
    }
  }

  return inside
}

module.exports = { part1, part2 }
