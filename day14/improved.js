require('../utils')()

const part1 = input => {
  let grid = input.toGrid()

  let res = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 'O') {
        let steps = 1

        while (grid[r - steps]?.[c] === '.') {
          grid[r - steps][c] = 'O'
          grid[r - steps + 1][c] = '.'
          steps++
        }

        res += grid.length - (r - steps + 1)
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
          if (grid[r][c] === 'O') {
            let steps = 1

            while (grid[r - steps]?.[c] === '.') {
              grid[r - steps][c] = 'O'
              grid[r - steps + 1][c] = '.'
              steps++
            }
          }
        }
      }

      grid = grid.rotate()
    })

    if (cycle > 1000) {
      let res = 0
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          res += grid[r][c] === 'O' ? grid.length - r : 0
        }
      }

      pattern.push(res)

      let firstHalf = pattern.slice(0, pattern.length / 2)
      let secondHalf = pattern.slice(pattern.length / 2)

      if (firstHalf.equals(secondHalf)) break
    }

    cycle++
  }

  return pattern[(1_000_000_000 - 1 - cycle - 1) % pattern.length]
}

module.exports = { part1, part2 }
