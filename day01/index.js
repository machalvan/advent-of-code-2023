import '../utils.js'

export const part1 = input => {
  return input
    .toLines()
    .map(line =>
      [+line.match(/\d/g).at(0), +line.match(/\d/g).at(-1)].reduce(
        (acc, cur, i, arr) => acc + cur * 10 ** (arr.length - 1 - i),
        0
      )
    )
    .sum()
}

export const part2 = input => {
  return input
    .toLines()
    .map(line =>
      [
        line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/g).at(0),
        line
          .toList()
          .toReversed()
          .join('')
          .match(/(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g)
          .at(0)
      ]
        .map(
          digit =>
            +digit
              .replace(/one/, 1)
              .replace(/two/, 2)
              .replace(/three/, 3)
              .replace(/four/, 4)
              .replace(/five/, 5)
              .replace(/six/, 6)
              .replace(/seven/, 7)
              .replace(/eight/, 8)
              .replace(/nine/, 9)

              .replace(/eno/, 1)
              .replace(/owt/, 2)
              .replace(/eerht/, 3)
              .replace(/ruof/, 4)
              .replace(/evif/, 5)
              .replace(/xis/, 6)
              .replace(/neves/, 7)
              .replace(/thgie/, 8)
              .replace(/enin/, 9)
        )
        .reduce((acc, cur, i, arr) => acc + cur * 10 ** (arr.length - 1 - i), 0)
    )
    .sum()
}
