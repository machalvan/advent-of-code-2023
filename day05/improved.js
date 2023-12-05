require('../utils')()

const part1 = input => {
  let [seeds, ...maps] = input.toBlocks()
  seeds = seeds[0].getNums()
  maps = maps.map(map =>
    map
      .slice(1)
      .map(nums => nums.getNums())
      .map(nums => [nums[1], nums[1] + nums[2] - 1, nums[0] - nums[1]])
  )

  return seeds
    .map(seed =>
      maps.reduce(
        (acc, map) =>
          acc +
          (map.find(([start, end]) => acc >= start && acc <= end)?.[2] ?? 0),
        seed
      )
    )
    .min()
}

const part2 = input => {
  let [seeds, ...maps] = input.toBlocks()
  seeds = seeds[0].getNums()
  let [a, b, c, d, e, f, g] = maps
    .map(map =>
      map
        .slice(1)
        .map(nums => nums.getNums())
        .map(nums => [nums[0], nums[0] + nums[2] - 1, nums[1] - nums[0]])
    )
    .reverse()

  let counter = 0
  let found = false
  while (counter === 0 || !found) {
    counter++

    let res = counter
    res += a.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += b.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += c.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += d.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += e.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += f.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += g.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0

    loop(20, i => {
      if (i % 2 === 1) return

      if (res >= seeds[i] && res <= seeds[i] + seeds[i + 1] - 1) {
        found = true
      }
    })
  }

  return counter
}

module.exports = { part1, part2 }
