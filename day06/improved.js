require('../utils')()

const part1 = input => {
  return input
    .toLines()
    .map(line => line.getNums())
    .transpose()
    .map(([time, dist]) => {
      let res = 0

      for (let i = 0; i <= time; i++) {
        res += i * (time - i) > dist
      }

      return res
    })
    .prod()
}

const part2 = input => {
  return input
    .toLines()
    .map(line => line.replace(/ /g, '').getNums())
    .transpose()
    .map(([time, dist]) => {
      let res = 0

      for (let i = 0; i <= time; i++) {
        res += i * (time - i) > dist
      }

      return res
    })
    .prod()
}

module.exports = { part1, part2 }
