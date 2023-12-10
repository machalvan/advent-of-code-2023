require('../utils')()

const part1 = input => {
  let grid = input.toGrid()

  let res = 0
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i]

    let num = ''
    let isPart = false
    for (let j = 0; j < row.length; j++) {
      let cell = row[j]
      if (cell.isNum()) {
        num += cell

        grid.forEachSurrounding(j, i, ({ cell: char }) => {
          if (char !== undefined && isNaN(char) && char !== '.') {
            isPart = true
          }
        })
      } else {
        res += isPart ? +num : 0
        num = ''
        isPart = false
      }
    }

    res += isPart ? +num : 0
  }

  return res
}

const part2 = input => {
  let grid = input.toGrid()

  let res = 0
  let stars = {}
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i]

    let num = ''
    let starPos
    for (let j = 0; j < row.length; j++) {
      let cell = row[j]
      if (!isNaN(cell)) {
        num += cell

        grid.forEachSurrounding(j, i, ({ cell: char, x, y }) => {
          if (char === '*') {
            starPos = [x, y]
          }
        })
      } else {
        if (starPos) {
          stars[starPos] ??= []
          stars[starPos].push(num)
          res += +num
        }

        num = ''
        starPos = undefined
      }
    }

    if (starPos) {
      stars[starPos] ??= []
      stars[starPos].push(num)
      res += +num
    }
  }

  return Object.values(stars).reduce(
    (acc, cur) => acc + (cur.length === 2 ? cur[0] * cur[1] : 0),
    0
  )
}

module.exports = { part1, part2 }
