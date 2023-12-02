$('pre')
  .innerHTML.trim()
  .split('\n')
  .reduce(
    ([part1, part2], line) => [
      part1 + +(line.match(/\d/g).at(0) + line.match(/\d/g).at(-1)),
      part2 +
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
            .split('')
            .reverse()
            .join('')
            .match(/\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g)
            .at(0)
            .replace('eno', 1)
            .replace('owt', 2)
            .replace('eerht', 3)
            .replace('ruof', 4)
            .replace('evif', 5)
            .replace('xis', 6)
            .replace('neves', 7)
            .replace('thgie', 8)
            .replace('enin', 9)
        )
    ],
    [0, 0]
  )
