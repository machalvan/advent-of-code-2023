require('../utils')()

let E = {}

const next = (grid, r, c, dir) => {
  let char = grid[r]?.[c]

  if (char === undefined) return

  E[[r, c]] ??= []

  if (E[[r, c]].includes(dir)) {
    return
  } else {
    E[[r, c]].push(dir)
  }

  let nr = r
  let nc = c

  if (char === '.') {
    if (dir === 0) {
      nr = r - 1
    } else if (dir === 1) {
      nc = c + 1
    } else if (dir === 2) {
      nr = r + 1
    } else if (dir === 3) {
      nc = c - 1
    }

    next(grid, nr, nc, dir)
  } else if (char === '/') {
    if (dir === 0) {
      dir = 1
      nc = c + 1
    } else if (dir === 1) {
      dir = 0
      nr = r - 1
    } else if (dir === 2) {
      dir = 3
      nc = c - 1
    } else if (dir === 3) {
      dir = 2
      nr = r + 1
    }

    next(grid, nr, nc, dir)
  } else if (char === '\\') {
    if (dir === 0) {
      dir = 3
      nc = c - 1
    } else if (dir === 1) {
      dir = 2
      nr = r + 1
    } else if (dir === 2) {
      dir = 1
      nc = c + 1
    } else if (dir === 3) {
      dir = 0
      nr = r - 1
    }

    next(grid, nr, nc, dir)
  } else if (char === '-') {
    if (dir === 1) {
      nc = c + 1
      next(grid, nr, nc, dir)
    } else if (dir === 3) {
      nc = c - 1
      next(grid, nr, nc, dir)
    } else {
      let nc1 = c - 1
      let nc2 = c + 1

      next(grid, nr, nc1, 3)
      next(grid, nr, nc2, 1)
    }
  } else if (char === '|') {
    if (dir === 0) {
      nr = r - 1
      next(grid, nr, nc, dir)
    } else if (dir === 2) {
      nr = r + 1
      next(grid, nr, nc, dir)
    } else {
      let nr1 = r - 1
      let nr2 = r + 1

      next(grid, nr1, nc, 0)
      next(grid, nr2, nc, 2)
    }
  }
}

const part1 = input => {
  let grid = input.toGrid()

  next(grid, 0, 0, 1)

  return Object.values(E).length
}

const part2 = input => {
  let grid = input.toGrid()

  let max = 0
  for (let i = 0; i < grid.length; i++) {
    next(grid, i, 0, 1)

    if (Object.values(E).length > max) {
      max = Object.values(E).length
    }

    E = {}

    next(grid, i, grid.length - 1, 3)

    if (Object.values(E).length > max) {
      max = Object.values(E).length
    }

    E = {}
  }

  for (let i = 0; i < grid[0].length; i++) {
    next(grid, 0, i, 2)

    if (Object.values(E).length > max) {
      max = Object.values(E).length
    }

    E = {}

    next(grid, grid[0].length - 1, i, 0)

    if (Object.values(E).length > max) {
      max = Object.values(E).length
    }

    E = {}
  }

  return max
}

module.exports = { part1, part2 }
