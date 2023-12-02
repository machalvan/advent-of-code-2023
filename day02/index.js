require('../utils')()

const parse = input =>
  input.toLines().map(line => {
    const [_, nums] = line.split(': ')
    const sets = nums.split('; ')

    return sets.map(set =>
      set.split(', ').map(item => item.split(' ').toNums())
    )
  })

const part1 = input => {
  let res = 0

  parse(input).forEach((line, i) => {
    let pos = true

    line.forEach(sets => {
      sets.forEach(set => {
        let [num, color] = set

        if (
          (color === 'red' && num > 12) ||
          (color === 'green' && num > 13) ||
          (color === 'blue' && num > 14)
        ) {
          pos = false
        }
      })
    })

    if (pos) {
      res += i + 1
    }
  })

  return res
}

const part2 = input => {
  let res = 0

  parse(input).forEach(line => {
    let prod = 1
    let red = 0
    let green = 0
    let blue = 0

    line.forEach(sets => {
      sets.forEach(set => {
        let [num, color] = set

        if (color === 'red') {
          red = num > red ? num : red
        } else if (color === 'green') {
          green = num > green ? num : green
        } else if (color === 'blue') {
          blue = num > blue ? num : blue
        }
      })

      prod = red * green * blue
    })

    res += prod
  })

  return res
}

module.exports = { part1, part2 }
