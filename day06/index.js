import '../utils.js'

export const part1 = input => {
  let [times, dists] = input.toLines().map(line => line.getNums())

  return times
    .map((time, i) => {
      let res = 0

      for (let j = 0; j <= time; j++) {
        res += j + j * (time - j - 1) > dists[i]
      }

      return res
    })
    .prod()
}

export const part2 = input => {
  let [times, dists] = input
    .toLines()
    .map(line => line.replace(/ /g, '').getNums())

  return times
    .map((time, i) => {
      let res = 0

      for (let j = 0; j <= time; j++) {
        res += j + j * (time - j - 1) > dists[i]
      }

      return res
    })
    .prod()
}
