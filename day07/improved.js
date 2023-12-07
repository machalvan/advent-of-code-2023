require('../utils')()

const part1 = input => {
  return input
    .toLines()
    .map(line => line.split(' '))
    .sort(([aHand], [bHand]) => {
      let [aType, bType] = [aHand, bHand].map(hand => {
        let occ = hand.split('').countAll()
        let values = Object.values(occ)

        return [
          values.count(2),
          values.count(2) === 2,
          values.count(3),
          values.count(3) && values.count(2),
          values.count(4),
          values.count(5)
        ].findLastIndex(v => v)
      })

      if (aType < bType) return -1
      if (aType > bType) return 1

      const compStrengths = (a, b) => {
        let [aVal, bVal] = [a, b].map(
          ([card]) => ({ T: 10, J: 11, Q: 12, K: 13, A: 14 }[card] ?? card)
        )

        if (aVal < bVal) return -1
        if (aVal > bVal) return 1

        return compStrengths(a.slice(1), b.slice(1))
      }

      return compStrengths(aHand, bHand)
    })
    .reduce((acc, [_, bid], i) => acc + bid * (i + 1), 0)
}

const part2 = input => {
  return input
    .toLines()
    .map(line => line.split(' '))
    .sort(([aHand], [bHand]) => {
      let [aType, bType] = [aHand, bHand].map(hand => {
        let occ = hand.split('').countAll()
        let JCount = occ.J ?? 0
        occ.J = 0

        let values = Object.values(occ)
        values[values.indexOf(values.max())] += JCount

        return [
          values.count(2),
          values.count(2) === 2,
          values.count(3),
          values.count(3) && values.count(2),
          values.count(4),
          values.count(5)
        ].findLastIndex(v => v)
      })

      if (aType < bType) return -1
      if (aType > bType) return 1

      const compStrengths = (a, b) => {
        let [aVal, bVal] = [a, b].map(
          ([card]) => ({ T: 10, J: 1, Q: 12, K: 13, A: 14 }[card] ?? card)
        )

        if (aVal < bVal) return -1
        if (aVal > bVal) return 1

        return compStrengths(a.slice(1), b.slice(1))
      }

      return compStrengths(aHand, bHand)
    })
    .reduce((acc, [_, bid], i) => acc + bid * (i + 1), 0)
}

module.exports = { part1, part2 }
