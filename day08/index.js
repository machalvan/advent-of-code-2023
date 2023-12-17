import '../utils.js'

export const part1 = input => {
  let [dirs, graph] = input.toBlocks()
  dirs = dirs[0].split('')
  graph = graph
    .map(line => line.match(/(\w+) = \((\w+), (\w+)\)/).slice(1))
    .reduce((acc, [from, left, right]) => {
      acc[from] = [left, right]
      return acc
    }, {})

  let pos = 'AAA'
  let steps = 0
  while (pos !== 'ZZZ') {
    for (let dir of dirs) {
      let [left, right] = graph[pos]
      pos = dir === 'L' ? left : right
      steps++
    }
  }

  return steps
}

export const part2 = input => {
  let [dirs, graph] = input.toBlocks()
  dirs = dirs[0].split('')
  graph = graph
    .map(line => line.match(/(\w+) = \((\w+), (\w+)\)/).slice(1))
    .reduce((acc, [from, left, right]) => {
      acc[from] = [left, right]
      return acc
    }, {})

  let pos = Object.keys(graph).filter(k => k.endsWith('A'))
  let ends = Object.keys(graph).filter(k => k.endsWith('Z'))

  let steps = 0
  let stepsToEnd = {}
  while (Object.keys(stepsToEnd).length < ends.length) {
    for (let [index, dir] of dirs.entries()) {
      steps++

      pos.map((_, i) => {
        let [left, right] = graph[pos[i]]
        pos[i] = dir === 'L' ? left : right

        if (pos[i].endsWith('Z') && !stepsToEnd[[index, pos[i]]]) {
          stepsToEnd[[index, pos[i]]] = steps
        }
      })
    }
  }

  return Object.values(stepsToEnd).lcm()
}
