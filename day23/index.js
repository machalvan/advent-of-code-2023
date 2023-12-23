import '../utils.js'

export const part1 = input => {
  let grid = input.toGrid()
  let sr = 0
  let sc = 1
  let R = grid.length
  let C = grid[0].length
  let er = R - 1
  let ec = C - 2
  let max = 0
  let queue = [[sr, sc, [], 2]]

  while (queue.length) {
    let [r, c, visited, dir] = queue.shift()

    if (r === er && c === ec) {
      max = Math.max(max, visited.length)
      continue
    }

    let cell = grid[r]?.[c]
    if (cell === undefined || cell === '#') continue
    if (visited.includes(`${r},${c}`)) continue
    if (grid[r][c] === '>' && dir === 3) continue
    if (grid[r][c] === '<' && dir === 1) continue
    if (grid[r][c] === '^' && dir === 2) continue
    if (grid[r][c] === 'v' && dir === 0) continue

    queue.push([r, c + 1, [...visited, `${r},${c}`], 1])
    queue.push([r, c - 1, [...visited, `${r},${c}`], 3])
    queue.push([r + 1, c, [...visited, `${r},${c}`], 2])
    queue.push([r - 1, c, [...visited, `${r},${c}`], 0])
  }

  return max
}

export const part2 = input => {
  let grid = input.toGrid()
  let sr = 0
  let sc = 1
  let R = grid.length
  let C = grid[0].length
  let er = R - 1
  let ec = C - 2
  let crossroads = {}

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let validDirCount = 0

      for (let [dr, dc] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
      ]) {
        let rr = r + dr
        let cc = c + dc
        let cell = grid[rr]?.[cc]

        if (cell === undefined || cell === '#') continue

        validDirCount++
      }

      if (validDirCount > 2) {
        crossroads[`${r},${c}`] = true
      }
    }
  }

  crossroads[`${sr},${sc}`] = true
  crossroads[`${er},${ec}`] = true

  let edges = {}

  for (let crossroad in crossroads) {
    let [cr, cc] = crossroad.split(',').map(Number)
    edges[crossroad] = []

    let queue = [[cr, cc, 0]]
    let seen = []

    while (queue.length) {
      let [r, c, dist] = queue.shift()
      let cell = grid[r]?.[c]

      if (cell === undefined || cell === '#') continue

      if (seen.includes(`${r},${c}`)) continue
      seen.push(`${r},${c}`)

      if (crossroads[`${r},${c}`] && crossroad !== `${r},${c}`) {
        edges[crossroad] = [...edges[crossroad], [r, c, dist]]
        continue
      }

      queue.push([r, c + 1, dist + 1])
      queue.push([r, c - 1, dist + 1])
      queue.push([r + 1, c, dist + 1])
      queue.push([r - 1, c, dist + 1])
    }
  }

  let SEEN = {}
  let max = 0

  let dfs = (r, c, dist) => {
    let key = `${r},${c}`

    if (SEEN[key]) return
    SEEN[key] = true

    if (r === er && c === ec) {
      max = Math.max(max, dist)
    }

    for (let route of edges[key]) {
      let [rn, cn, distN] = route
      dfs(rn, cn, dist + distN)
    }

    SEEN[key] = false
  }

  dfs(sr, sc, 0)

  return max
}
