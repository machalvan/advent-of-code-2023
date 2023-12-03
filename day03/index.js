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
      if (!isNaN(cell)) {
        num += cell

        let topLeft = i > 0 && j > 0 && grid[i - 1][j - 1]
        let top = i > 0 && grid[i - 1][j]
        let topRight = i > 0 && j < row.length - 1 && grid[i - 1][j + 1]
        let left = j > 0 && grid[i][j - 1]
        let right = j < row.length - 1 && grid[i][j + 1]
        let bottomLeft = i < grid.length - 1 && j > 0 && grid[i + 1][j - 1]
        let bottom = i < grid.length - 1 && grid[i + 1][j]
        let bottomRight =
          i < row.length - 1 && j < grid.length - 1 && grid[i + 1][j + 1]

        if (
          (isNaN(topLeft) && topLeft !== '.') ||
          (isNaN(top) && top !== '.') ||
          (isNaN(topRight) && topRight !== '.') ||
          (isNaN(left) && left !== '.') ||
          (isNaN(right) && right !== '.') ||
          (isNaN(bottomLeft) && bottomLeft !== '.') ||
          (isNaN(bottom) && bottom !== '.') ||
          (isNaN(bottomRight) && bottomRight !== '.')
        ) {
          isPart = true
        }
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

        let topLeft = i > 0 && j > 0 && grid[i - 1][j - 1]
        let top = i > 0 && grid[i - 1][j]
        let topRight = i > 0 && j < row.length - 1 && grid[i - 1][j + 1]
        let left = j > 0 && grid[i][j - 1]
        let right = j < row.length - 1 && grid[i][j + 1]
        let bottomLeft = i < grid.length - 1 && j > 0 && grid[i + 1][j - 1]
        let bottom = i < grid.length - 1 && grid[i + 1][j]
        let bottomRight =
          i < row.length - 1 && j < grid.length - 1 && grid[i + 1][j + 1]

        if (topLeft === '*') {
          starPos = i - 1 + ',' + (j - 1)
        }

        if (top === '*') {
          starPos = i - 1 + ',' + j
        }

        if (topRight === '*') {
          starPos = i - 1 + ',' + (j + 1)
        }

        if (left === '*') {
          starPos = i + ',' + (j - 1)
        }

        if (right === '*') {
          starPos = i + ',' + (j + 1)
        }

        if (bottomLeft === '*') {
          starPos = i + 1 + ',' + (j - 1)
        }

        if (bottom === '*') {
          starPos = i + 1 + ',' + j
        }

        if (bottomRight === '*') {
          starPos = i + 1 + ',' + (j + 1)
        }
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
