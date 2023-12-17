import '../utils.js'

export const part1 = input => {
  return input
    .toLines()
    .map(line => {
      let [_, winning, my] = line.split(/:|\|/)
      let winningNums = winning.getNums()
      let myNums = my.getNums()
      let wins = winningNums.intersection(myNums).length

      return wins > 1 ? 2 ** (wins - 1) : wins
    })
    .sum()
}

export const part2 = input => {
  let copies = Array(input.toLines().length).fill(1)

  input.toLines().map((line, i) => {
    let [_, winning, my] = line.split(/:|\|/)
    let winningNums = winning.getNums()
    let myNums = my.getNums()
    let wins = winningNums.intersection(myNums).length

    for (let j = i + 1; j < i + 1 + wins; j++) {
      copies[j] += copies[i]
    }
  })

  return copies.sum()
}
