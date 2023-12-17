import { manhattan } from '../utils.js'

export const part1 = input => {
  let galaxy = input.toGrid()
  let emptyRows = galaxy
    .map((_, i) => i)
    .filter(i => galaxy[i].every(char => char === '.'))
  let emptyCols = galaxy
    .map((_, i) => i)
    .filter(i => galaxy.every(row => row[i] === '.'))

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

      let isBetween = (val, a, b) =>
        Math.min(a, b) < val && val < Math.max(a, b)

      let extra =
        emptyRows.map(r => isBetween(r, y1, y2)).sum() +
        emptyCols.map(c => isBetween(c, x1, x2)).sum()

      res += manhattan(x1, y1, x2, y2) + extra
    }
  }

  return res
}

export const part2 = input => {
  let galaxy = input.toGrid()
  let emptyRows = galaxy
    .map((_, i) => i)
    .filter(i => galaxy[i].every(char => char === '.'))
  let emptyCols = galaxy
    .map((_, i) => i)
    .filter(i => galaxy.every(row => row[i] === '.'))

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

      let isBetween = (val, a, b) =>
        Math.min(a, b) < val && val < Math.max(a, b)

      let extra =
        emptyRows.map(r => isBetween(r, y1, y2) * 999_999).sum() +
        emptyCols.map(c => isBetween(c, x1, x2) * 999_999).sum()

      res += manhattan(x1, y1, x2, y2) + extra
    }
  }

  return res
}
