import '../utils.js'

const getDiff = (a, b) => {
  if (a === undefined || b === undefined) return 999

  let diff = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diff++
  }

  return diff
}

export const part1 = input => {
  let blocks = input.toBlocks()

  let res = 0
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i]
    let block2 = block
      .map(line => line.split(''))
      .rotate()
      .map(line => line.join(''))
    let rotations = [block, block2]

    for (let j = 0; j < 2; j++) {
      let rotation = rotations[j]
      let stack = []

      for (let k = 0; k < rotation.length; k++) {
        let line = rotation[k]

        let found = true
        if (line === stack.at(-1)) {
          for (let l = stack.length - 1; l >= 0; l--) {
            let mirrorRow = rotation[k + (stack.length - 1 - l)]

            if (mirrorRow === undefined) break

            if (stack[l] !== mirrorRow) {
              found = false
              break
            }
          }

          if (found) {
            res += (j === 0 ? 100 : 1) * k
            break
          }
        }

        stack.push(line)
      }
    }
  }

  return res
}

export const part2 = input => {
  let blocks = input.toBlocks()

  let res = 0
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i]
    let block2 = block
      .map(line => line.split(''))
      .rotate()
      .map(line => line.join(''))
    let rotations = [block, block2]

    for (let j = 0; j < 2; j++) {
      let rotation = rotations[j]
      let stack = []

      for (let k = 0; k < rotation.length; k++) {
        let line = rotation[k]

        let found = true
        let diff = getDiff(line, stack.at(-1))
        if (diff <= 1) {
          diff = 0

          for (let l = stack.length - 1; l >= 0; l--) {
            let mirrorRow = rotation[k + (stack.length - 1 - l)]
            if (mirrorRow === undefined) break

            let diff2 = getDiff(stack[l], mirrorRow)
            diff += diff2

            if (diff2 > 1) {
              found = false
              break
            }
          }

          if (found && diff === 1) {
            res += (j === 0 ? 100 : 1) * k
            break
          }
        }

        stack.push(line)
      }
    }
  }

  return res
}
