require('../utils')()

const part1 = input => {
  let [seeds, a, b, c, d, e, f, g] = input.toBlocks()
  seeds = seeds[0].getNums()

  let convert = value =>
    value
      .slice(1)
      .map(nums => nums.getNums())
      .map(nums => [nums[1], nums[1] + nums[2] - 1, nums[0] - nums[1]])

  a = convert(a)
  b = convert(b)
  c = convert(c)
  d = convert(d)
  e = convert(e)
  f = convert(f)
  g = convert(g)

  return seeds
    .map(seed => {
      let res = seed

      res += a.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
      res += b.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
      res += c.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
      res += d.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
      res += e.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
      res += f.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
      res += g.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0

      return res
    })
    .min()
}

const part2 = input => {
  let [seeds, a, b, c, d, e, f, g] = input.toBlocks()
  seeds = seeds[0].getNums()

  let convert = value =>
    value
      .slice(1)
      .map(nums => nums.getNums())
      .map(nums => [nums[0], nums[0] + nums[2] - 1, nums[1] - nums[0]])

  a = convert(a)
  b = convert(b)
  c = convert(c)
  d = convert(d)
  e = convert(e)
  f = convert(f)
  g = convert(g)

  let counter = 0
  let found = false
  while (counter === 0 || !found) {
    counter++

    let res = counter
    res += g.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += f.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += e.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += d.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += c.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += b.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0
    res += a.find(([start, end]) => res >= start && res <= end)?.[2] ?? 0

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
