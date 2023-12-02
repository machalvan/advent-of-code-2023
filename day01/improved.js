require('../utils')()

const part1 = input => {
  return input
    .toLines()
    .map(line => +(line.match(/\d/g).at(0) + line.match(/\d/g).at(-1)))
    .sum()
}

const part2 = input => {
  return input
    .toLines()
    .map(
      line =>
        +(
          line
            .match(/\d|one|two|three|four|five|six|seven|eight|nine/g)
            .at(0)
            .replace('one', 1)
            .replace('two', 2)
            .replace('three', 3)
            .replace('four', 4)
            .replace('five', 5)
            .replace('six', 6)
            .replace('seven', 7)
            .replace('eight', 8)
            .replace('nine', 9) +
          line
            .toReversed()
            .match(/\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g)
            .at(0)
            .toReversed()
            .replace('one', 1)
            .replace('two', 2)
            .replace('three', 3)
            .replace('four', 4)
            .replace('five', 5)
            .replace('six', 6)
            .replace('seven', 7)
            .replace('eight', 8)
            .replace('nine', 9)
        )
    )
    .sum()
}

module.exports = { part1, part2 }
