$('pre')
  .innerHTML.trim()
  .split('\n')
  .reduce(
    ([part1, part2], line, i) => [
      part1 +
        (line
          .match(/(\d+ \w+)/g)
          .map(cubes => cubes.split(' '))
          .every(
            ([num, color]) => num <= { red: 12, green: 13, blue: 14 }[color]
          ) && i + 1),
      part2 +
        ['red', 'green', 'blue']
          .map(color =>
            Math.max(
              ...line
                .match(new RegExp(`(\\d+) ${color}`, 'g'))
                .map(cubes => cubes.split(' ')[0])
            )
          )
          .reduce((acc, cur) => acc * cur, 1)
    ],
    [0, 0]
  )
