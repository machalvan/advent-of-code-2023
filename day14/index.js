require('../utils')()

const part1 = input => {
  let grid = input.toGrid()

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let char = grid[r][c]

      if (char === 'O') {
        let steps = 0

        while (grid[r - 1 - steps]?.[c] === '.') {
          grid[r - 1 - steps][c] = 'O'
          grid[r - steps][c] = '.'
          steps++
        }
      }
    }
  }

  let res = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let char = grid[r][c]

      if (char === 'O') {
        res += grid.length - r
      }
    }
  }

  return res
}

const part2 = input => {
  let grid = input.toGrid()

  let pattern = []
  let cycle = 0
  while (true) {
    loop(4, () => {
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          let char = grid[r][c]

          if (char === 'O') {
            let steps = 0

            while (grid[r - 1 - steps]?.[c] === '.') {
              grid[r - 1 - steps][c] = char
              grid[r - steps][c] = '.'
              steps++
            }
          }
        }
      }

      grid = grid.rotate()
    })

    if (cycle >= 1000) {
      let res = 0
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          let char = grid[r][c]

          if (char === 'O') {
            res += grid.length - r
          }
        }
      }

      pattern.push(res)

      let firstHalf = pattern.slice(0, pattern.length / 2)
      let secondHalf = pattern.slice(pattern.length / 2)

      if (firstHalf.equals(secondHalf)) break
    }

    cycle++
  }

  return pattern[(1_000_000_000 - cycle - 2) % pattern.length]
}

module.exports = { part1, part2 }
