require('../utils')()

const getDiff = (a, b) => {
  return a !== undefined && b !== undefined
    ? a.split('').reduce((sum, char, i) => sum + (char !== b[i]), 0)
    : Infinity
}

const part1 = input => {
  return input.toBlocks().reduce(
    (sum, block) =>
      sum +
      [
        block,
        block
          .map(line => line.split(''))
          .rotate()
          .map(line => line.join(''))
      ].reduce((sum, rotation, i) => {
        let stack = []

        return (
          sum +
          rotation.reduce((sum, line, j) => {
            if (
              line === stack.at(-1) &&
              stack.every(
                (row, k) =>
                  (rotation[j + (stack.length - 1 - k)] ?? row) === row
              )
            )
              return sum + (i === 0 ? 100 : 1) * j

            stack.push(line)
            return sum
          }, 0)
        )
      }, 0),
    0
  )
}

const part2 = input => {
  return input.toBlocks().reduce(
    (sum, block) =>
      sum +
      [
        block,
        block
          .map(line => line.split(''))
          .rotate()
          .map(line => line.join(''))
      ].reduce((sum, rotation, i) => {
        let stack = []

        for (let j = 0; j < rotation.length; j++) {
          let line = rotation[j]

          let found = true
          let diff = getDiff(line, stack.at(-1))
          if (diff <= 1) {
            for (let k = stack.length - 1; k >= 0; k--) {
              let mirrorRow = rotation[j + (stack.length - 1 - k)]

              if (mirrorRow === undefined) break

              let diff2 = getDiff(stack[k], mirrorRow)
              diff += diff2

              if (diff2 > 1) {
                found = false
                break
              }
            }

            if (found && diff >= 1) {
              sum += (i === 0 ? 100 : 1) * j
              break
            }
          }

          stack.push(line)
        }

        return sum
      }, 0),
    0
  )
}

module.exports = { part1, part2 }
