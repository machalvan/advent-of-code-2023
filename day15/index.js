require('../utils')()

let hash = str => {
  let val = 0

  for (let j = 0; j < str.length; j++) {
    let char = str[j]
    let ascii = char.charCodeAt(0)
    val += ascii
    val *= 17
    val %= 256
  }

  return val
}

const part1 = input => {
  let sum = 0

  for (let step of input.split(',')) {
    sum += hash(step)
  }

  return sum
}

const part2 = input => {
  let lenses = {}
  let boxes = {}
  let lensToBox = {}

  for (let step of input.split(',')) {
    if (step.includes('=')) {
      let [label, focal] = step.split('=')
      focal = +focal

      let box = hash(label)

      boxes[box] ??= []
      if (!boxes[box].includes(label)) boxes[box].push(label)

      lensToBox[label] = box
      lenses[label] = focal
    } else {
      let [label] = step.split('-')
      let box = hash(label)

      boxes[box] = boxes[box]?.filter(lens => lens !== label)

      delete lensToBox[label]
      delete lenses[label]
    }
  }

  let sum = 0
  for (let [lens, focal] of Object.entries(lenses)) {
    let box = lensToBox[lens]
    let slot = boxes[box].indexOf(lens) + 1

    sum += (1 + box) * slot * focal
  }

  return sum
}

module.exports = { part1, part2 }
