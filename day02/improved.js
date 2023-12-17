import '../utils.js'

export const part1 = input => {
  return input.toLines().reduce(
    (sum, line, i) =>
      sum +
      (line
        .match(/(\d+ \w+)/g)
        .map(cubes => cubes.split(' '))
        .every(
          ([num, color]) => num <= { red: 12, green: 13, blue: 14 }[color]
        ) && i + 1),
    0
  )
}

export const part2 = input => {
  return input.toLines().reduce(
    (sum, line) =>
      sum +
      ['red', 'green', 'blue']
        .map(color =>
          line
            .match(new RegExp(`(\\d+) ${color}`, 'g'))
            .map(cubes => cubes.split(' ')[0])
            .max()
        )
        .prod(),
    0
  )
}
