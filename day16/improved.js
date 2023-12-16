require('../utils')()

const part1 = input => {
  let grid = input.toGrid()
  let E = {}

  let next = (r, c, dir) => {
    let char = grid[r]?.[c]

    if (char === undefined) return

    E[[r, c]] ??= []

    if (E[[r, c]].includes(dir)) {
      return
    } else {
      E[[r, c]].push(dir)
    }

    let dr = [-1, 0, 1, 0][dir]
    let dc = [0, 1, 0, -1][dir]

    switch (char) {
      case '.':
        return next(r + dr, c + dc, dir)
      case '/':
        return next(r - dc, c - dr, dir + (dir % 2 === 0 ? 1 : -1))
      case '\\':
        return next(r + dc, c + dr, 3 - dir)
      case '-':
        return [1, 3].includes(dir)
          ? next(r, c + dc, dir)
          : next(r, c - 1, 3) || next(r, c + 1, 1)
      case '|':
        return [0, 2].includes(dir)
          ? next(r + dr, c, dir)
          : next(r - 1, c, 0) || next(r + 1, c, 2)
    }
  }

  next(0, 0, 1)

  return Object.values(E).length
}

const part2 = input => {
  let grid = input.toGrid()

  let score = (r, c, dir) => {
    let E = {}

    let next = (r, c, dir) => {
      let char = grid[r]?.[c]

      if (char === undefined) return

      E[[r, c]] ??= []

      if (E[[r, c]].includes(dir)) {
        return
      } else {
        E[[r, c]].push(dir)
      }

      let dr = [-1, 0, 1, 0][dir]
      let dc = [0, 1, 0, -1][dir]

      switch (char) {
        case '.':
          return next(r + dr, c + dc, dir)
        case '/':
          return next(r - dc, c - dr, dir + (dir % 2 === 0 ? 1 : -1))
        case '\\':
          return next(r + dc, c + dr, 3 - dir)
        case '-':
          return [1, 3].includes(dir)
            ? next(r, c + dc, dir)
            : next(r, c - 1, 3) || next(r, c + 1, 1)
        case '|':
          return [0, 2].includes(dir)
            ? next(r + dr, c, dir)
            : next(r - 1, c, 0) || next(r + 1, c, 2)
      }
    }

    next(r, c, dir)
    return Object.values(E).length
  }

  let max = 0
  for (let r = 0; r < grid.length; r++) {
    max = Math.max(max, score(r, 0, 1))
    max = Math.max(max, score(r, grid[0].length - 1, 3))
  }

  for (let c = 0; c < grid[0].length; c++) {
    max = Math.max(max, score(0, c, 2))
    max = Math.max(max, score(grid.length - 1, c, 0))
  }

  return max
}

module.exports = { part1, part2 }
