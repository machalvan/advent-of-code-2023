require('../utils')()

const part1 = input => {
  return input
    .toLines()
    .map(line => {
      let [_, winning, my] = line.split(/[:|]/)
      let wins = winning.getNums().intersection(my.getNums()).length

      return wins > 0 ? 2 ** (wins - 1) : 0
    })
    .sum()
}

const part2 = input => {
  let cards = Array(input.toLines().length).fill(1)

  return input
    .toLines()
    .map((line, i) => {
      let [_, winning, my] = line.split(/[:|]/)
      let wins = winning.getNums().intersection(my.getNums()).length

      loop(wins, j => {
        cards[i + 1 + j] += cards[i]
      })

      return cards[i]
    })
    .sum()
}

module.exports = { part1, part2 }
