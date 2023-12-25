import '../utils.js'

let minCut = graph => {
  // Karger's minimum cut algorithm

  let newGraph = { ...graph }

  while (Object.values(newGraph).some(v => v.length !== 3)) {
    newGraph = { ...graph }

    while (
      Object.keys(newGraph).length > 2 &&
      Object.values(newGraph).some(v => v.length !== 3)
    ) {
      let a =
        Object.keys(newGraph)[
          Math.floor(Math.random() * Object.keys(newGraph).length)
        ]
      let b = newGraph[a][Math.floor(Math.random() * newGraph[a].length)]

      // Remove edge
      newGraph[a].splice(newGraph[a].indexOf(b), 1)
      newGraph[b].splice(newGraph[b].indexOf(a), 1)

      // Add new node a,b
      let newNode = `${a},${b}`
      let combinedNodes = newGraph[a].concat(newGraph[b])
      newGraph[newNode] = combinedNodes

      // Connect edges to new node
      for (let destNode of combinedNodes) {
        newGraph[destNode] = [...newGraph[destNode], newNode]
      }

      // Remove old nodes
      delete newGraph[a]
      delete newGraph[b]

      // Remove old nodes from other nodes
      for (let [key, value] of Object.entries(newGraph)) {
        newGraph[key] = value.filter(v => v !== a && v !== b)
      }

      // Remove self-loops
      for (let [key, value] of Object.entries(newGraph)) {
        newGraph[key] = value.filter(v => v !== key)
      }
    }
  }

  return newGraph
}

export const part1 = input => {
  let graph = {}

  input.toLines().forEach(line => {
    let [from, to] = line.split(': ')
    to = to.split(' ')

    graph[from] ??= []
    graph[from] = [...graph[from], ...to]

    for (let node of to) {
      graph[node] ??= []
      graph[node] = [...graph[node], from]
    }
  })

  return Object.keys(minCut(graph)).reduce(
    (prod, key) => prod * key.split(',').length,
    1
  )
}

export const part2 = input => {
  return
}
