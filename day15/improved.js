import '../utils.js'

let hash = str => {
  return str
    .split('')
    .reduce((val, char) => ((val + char.charCodeAt(0)) * 17) % 256, 0)
}

export const part1 = input => {
  return input.split(',').map(hash).sum()
}

export const part2 = input => {
  let [lenses, boxes, lensToBox] = input.split(',').reduce(
    ([lenses, boxes, lensToBox], step) => {
      let [lens, focal] = step.split(/=|-/)
      let box = hash(lens)

      if (step.includes('=')) {
        boxes[box] ??= []
        if (!boxes[box].includes(lens)) boxes[box].push(lens)

        lensToBox[lens] = box
        lenses[lens] = +focal
      } else {
        boxes[box] = boxes[box]?.filter(boxLens => boxLens !== lens)

        delete lensToBox[lens]
        delete lenses[lens]
      }

      return [lenses, boxes, lensToBox]
    },
    [{}, {}, {}]
  )

  return Object.entries(lenses)
    .map(([lens, focal]) => {
      let box = lensToBox[lens]
      let slot = boxes[box].indexOf(lens) + 1

      return (1 + box) * slot * focal
    })
    .sum()
}
