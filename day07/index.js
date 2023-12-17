import '../utils.js'

const compStrength = (a, b, JIsLow = false) => {
  if (a.length === 0) return 0
  if (b.length === 0) return 0

  let values = { T: 10, J: JIsLow ? 1 : 11, Q: 12, K: 13, A: 14 }

  let aVal = values[a[0]?.[0]] ?? +a[0]?.[0]
  let bVal = values[b[0]?.[0]] ?? +b[0]?.[0]

  return aVal > bVal
    ? 1
    : aVal < bVal
    ? -1
    : compStrength([a[0].slice(1), a[1]], [b[0].slice(1), b[1]], JIsLow)
}

export const part1 = input => {
  let cards = {
    high: [],
    one: [],
    two: [],
    three: [],
    house: [],
    four: [],
    five: []
  }

  input.toLines().map(line => {
    let [hand, bid] = line.split(' ')
    bid = +bid

    let occ = hand.split('').countAll()

    let values = Object.values(occ)
    if (values.includes(5)) {
      cards.five.push([hand, bid])
    } else if (values.includes(4)) {
      cards.four.push([hand, bid])
    } else if (values.includes(3) && values.includes(2)) {
      cards.house.push([hand, bid])
    } else if (values.includes(3)) {
      cards.three.push([hand, bid])
    } else if (values.filter(v => v === 2).length === 2) {
      cards.two.push([hand, bid])
    } else if (values.filter(v => v === 2).length === 1) {
      cards.one.push([hand, bid])
    } else {
      cards.high.push([hand, bid])
    }
  })

  let orderedHands = [
    ...cards.high.sort(compStrength),
    ...cards.one.sort(compStrength),
    ...cards.two.sort(compStrength),
    ...cards.three.sort(compStrength),
    ...cards.house.sort(compStrength),
    ...cards.four.sort(compStrength),
    ...cards.five.sort(compStrength)
  ]

  return orderedHands.reduce((acc, [_, bid], i) => acc + (i + 1) * bid, 0)
}

export const part2 = input => {
  let cards = {
    high: [],
    one: [],
    two: [],
    three: [],
    house: [],
    four: [],
    five: []
  }

  input.toLines().map(line => {
    let [hand, bid] = line.split(' ')
    bid = +bid

    let occ = hand.split('').countAll()

    let JCount = occ['J'] ?? 0
    occ['J'] = 0

    let values = Object.values(occ)
    let highestI = values.indexOf(Math.max(...values))
    values[highestI] += JCount

    if (values.includes(5)) {
      cards.five.push([hand, bid])
    } else if (values.includes(4)) {
      cards.four.push([hand, bid])
    } else if (values.includes(3) && values.includes(2)) {
      cards.house.push([hand, bid])
    } else if (values.includes(3)) {
      cards.three.push([hand, bid])
    } else if (values.filter(v => v === 2).length === 2) {
      cards.two.push([hand, bid])
    } else if (values.filter(v => v === 2).length === 1) {
      cards.one.push([hand, bid])
    } else {
      cards.high.push([hand, bid])
    }
  })

  let orderedHands = [
    ...cards.high.sort((a, b) => compStrength(a, b, true)),
    ...cards.one.sort((a, b) => compStrength(a, b, true)),
    ...cards.two.sort((a, b) => compStrength(a, b, true)),
    ...cards.three.sort((a, b) => compStrength(a, b, true)),
    ...cards.house.sort((a, b) => compStrength(a, b, true)),
    ...cards.four.sort((a, b) => compStrength(a, b, true)),
    ...cards.five.sort((a, b) => compStrength(a, b, true))
  ]

  return orderedHands.reduce((acc, [_, bid], i) => acc + (i + 1) * bid, 0)
}
