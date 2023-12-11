require('../utils')()

const part1 = input => {
  let galaxy = []
  for (let line of input.toLines()) {
    let chars = line.split('')
    if (chars.every(char => char === '.')) {
      galaxy.push(chars)
      galaxy.push(chars)
    } else {
      galaxy.push(chars)
    }
  }

  galaxy = galaxy.rotate()

  let galaxy2 = []
  for (let line of galaxy) {
    if (line.every(char => char === '.')) {
      galaxy2.push(line)
      galaxy2.push(line)
    } else {
      galaxy2.push(line)
    }
  }

  galaxy = galaxy2.rotate(-1)

  let pos = []
  for (let y = 0; y < galaxy.length; y++) {
    for (let x = 0; x < galaxy[y].length; x++) {
      if (galaxy[y][x] === '#') {
        pos.push([x, y])
      }
    }
  }

  let res = 0
  for (let i = 0; i < pos.length; i++) {
    for (let j = 0; j < i; j++) {
      let [x1, y1] = pos[i]
      let [x2, y2] = pos[j]
      let dx = x2 - x1
      let dy = y2 - y1
      let d = Math.abs(dx) + Math.abs(dy)
      res += d
    }
  }

  return res
}

const part2 = input => {
  let galaxy = []
  let emptyRows = []
  for (let [i, line] of input.toLines().entries()) {
    let chars = line.split('')
    if (chars.every(char => char === '.')) {
      galaxy.push(Array(chars.length).fill('x'))
      emptyRows.push(i)
    } else {
      galaxy.push(chars)
    }
  }

  galaxy = galaxy.rotate()

  let galaxy2 = []
  let emptyCols = []
  for (let [i, line] of galaxy.entries()) {
    if (line.every(char => char === '.' || char === 'x')) {
      galaxy2.push(Array(line.length).fill('x'))
      emptyCols.push(i)
    } else {
      galaxy2.push(line)
    }
  }

  galaxy = galaxy2.rotate(-1)

  let pos = []
  for (let y = 0; y < galaxy.length; y++) {
    for (let x = 0; x < galaxy[y].length; x++) {
      if (galaxy[y][x] === '#') {
        pos.push([x, y])
      }
    }
  }

  let res = 0
  for (let i = 0; i < pos.length; i++) {
    for (let j = 0; j < i; j++) {
      let [x1, y1] = pos[i]
      let [x2, y2] = pos[j]
      let penalty = 0

      for (let r of emptyRows) {
        if ((y1 < r && r < y2) || (y2 < r && r < y1)) {
          // y1++
          penalty += 1_000_000 - 1
        }
      }

      for (let c of emptyCols) {
        if ((x1 < c && c < x2) || (x2 < c && c < x1)) {
          penalty += 1_000_000 - 1
        }
      }

      res += manhattan(x1, y1, x2, y2) + penalty
    }
  }

  return res
}

module.exports = { part1, part2 }
