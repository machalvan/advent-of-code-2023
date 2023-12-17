require('../utils')()

const findTile = (grid, tile) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0]?.length; j++) {
      if (grid[i][j] === tile) return [j, i]
    }
  }
}

const getPipes = (grid, x, y, dir, pipes = []) => {
  let [nx, ny] = { 0: [x, y - 1], 1: [x + 1, y], 2: [x, y + 1], 3: [x - 1, y] }[
    dir
  ]

  let nextChar = grid[ny][nx]

  if (nextChar === 'S') return [...pipes, [x, y]]

  let nextDir =
    {
      0: { 7: 3, F: 1 },
      1: { J: 0, 7: 2 },
      2: { J: 3, L: 1 },
      3: { L: 0, F: 2 }
    }[dir]?.[nextChar] ?? dir

  return getPipes(grid, nx, ny, nextDir, [...pipes, [x, y]])
}

const part1 = input => {
  let grid = input.toGrid()
  let [sx, sy] = findTile(grid, 'S')

  let startDir
  grid.forEachAdjacent(sx, sy, ({ cell, dir }) => {
    if (startDir !== undefined) return

    startDir = {
      0: { '|': 0, 7: 0, F: 0 },
      1: { '-': 1, J: 1, 7: 1 },
      2: { '|': 2, J: 2, L: 2 },
      3: { '-': 3, L: 3, F: 3 }
    }[dir]?.[cell]
  })

  return getPipes(grid, sx, sy, startDir).length / 2
}

const part2 = input => {
  let grid = input.toGrid()
  let [sx, sy] = findTile(grid, 'S')

  let adjPipes = []
  grid.forEachAdjacent(sx, sy, ({ cell, dir }) => {
    adjPipes.push(
      {
        0: { '|': 0, 7: 0, F: 0 },
        1: { '-': 1, J: 1, 7: 1 },
        2: { '|': 2, J: 2, L: 2 },
        3: { '-': 3, L: 3, F: 3 }
      }[dir]?.[cell]
    )
  })

  let pipes = getPipes(grid, sx, sy, adjPipes[0])

  grid[sy][sx] = {
    '0,1': 'L',
    '1,2': 'F',
    '2,3': '7',
    '3,0': 'J',
    '0,2': '|',
    '1,3': '-'
  }[adjPipes.sort()]

  let isInside = {}
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (pipes.find(([pi, pj]) => pi === j && pj === i)) continue
      let [nj, ni] = [j, i - 1]

      let pipesAbove = []
      while (ni >= 0 && isInside[[nj, ni]] === undefined) {
        pipesAbove.push(grid[ni]?.[nj])
        ni--
      }

      let pipesToCross = pipesAbove.reduce((acc, tile) => {
        if (tile === '-') return acc + 1
        if (['7', 'L'].includes(tile)) return acc + 0.5
        if (['F', 'J'].includes(tile)) return acc - 0.5
        return acc
      }, 0)

      let isAboveInside = isInside[[nj, ni]] ?? false
      isInside[[j, i]] = pipesToCross % 2 === 0 ? isAboveInside : !isAboveInside
    }
  }

  return Object.values(isInside).sum()
}

module.exports = { part1, part2 }
