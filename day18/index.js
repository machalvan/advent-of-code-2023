import '../utils.js'

const getArea = ([x, y, ...rest]) =>
  rest + rest ? (x * rest[1]) / 2 - (y * rest[0]) / 2 + getArea(rest) : 0

export const part1 = input => {
  let r = 0
  let c = 0
  let shoelace = []
  let dirs = { R: 0, D: 1, L: 2, U: 3 }
  let lines = input.toLines()

  let getDir = i => dirs[lines[i]?.toWords()[0]]

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    let [_, steps] = line.toWords()
    steps = +steps

    let dir = getDir(i)
    let prevDir = getDir(i - 1)
    let nextDir = getDir(i + 1)

    let extra = 0
    if (dir === 0 && nextDir === 1) extra++
    if (dir === 0 && prevDir === 1) extra--
    if (dir === 1 && nextDir === 2) extra++
    if (dir === 1 && prevDir === 2) extra--
    if (dir === 2 && nextDir === 3) extra++
    if (dir === 2 && prevDir === 3) extra--
    if (dir === 3 && nextDir === 0) extra++
    if (dir === 3 && prevDir === 0) extra--

    if (dir === 0) c += steps + extra
    if (dir === 1) r += steps + extra
    if (dir === 2) c -= steps + extra
    if (dir === 3) r -= steps + extra

    shoelace.push([r, c])
  }

  return Math.abs(getArea(shoelace.flat()))
}

export const part2 = input => {
  let r = 0
  let c = 0
  let shoelace = []
  let lines = input.toLines()

  let getDir = i => +lines[i]?.toWords()[2].slice(2, -1).slice(5)

  let hexToDecimal = hex => parseInt(hex, 16)

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    let [, , steps] = line.toWords()
    steps = steps.slice(2, -1).slice(0, 5)
    steps = hexToDecimal(steps)

    let dir = getDir(i)
    let prevDir = getDir(i - 1)
    let nextDir = getDir(i + 1)

    let extra = 0
    if (dir === 0 && nextDir === 1) extra++
    if (dir === 0 && prevDir === 1) extra--
    if (dir === 1 && nextDir === 2) extra++
    if (dir === 1 && prevDir === 2) extra--
    if (dir === 2 && nextDir === 3) extra++
    if (dir === 2 && prevDir === 3) extra--
    if (dir === 3 && nextDir === 0) extra++
    if (dir === 3 && prevDir === 0) extra--

    if (dir === 0) c += steps + extra
    if (dir === 1) r += steps + extra
    if (dir === 2) c -= steps + extra
    if (dir === 3) r -= steps + extra

    shoelace.push([r, c])
  }

  return Math.abs(getArea(shoelace.flat()))
}
