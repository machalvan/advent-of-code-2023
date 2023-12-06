$('pre')
  .innerHTML.trim()
  .split('\n')
  .reduce(
    ([part1, part2], line) => [
      [...part1, line],
      [...part2, line.replace(/ /g, '')]
    ],
    [[], []]
  )
  .map((part, i) =>
    (i ? [0] : [0, 1, 2, 3])
      .map(j => [0, 1].map(k => part.map(line => line.match(/\d+/g))[k][j]))
      .map(([time, dist]) =>
        [...Array(+time + 1)]
          .map((_, j) => j * (time - j) > dist)
          .reduce((a, b) => a + b)
      )
      .reduce((a, b) => a * b)
  )
