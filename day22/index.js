import '../utils.js'

export const part1 = input => {
  let bricks = input
    .toLines()
    .map(line => line.split('~').map(pos => pos.getNums()))

  bricks = bricks.toSorted((a, b) => {
    let [, , z1] = a[0]
    let [, , z2] = b[0]
    return z1 - z2
  })

  let wholeBricks = []
  for (let i = 0; i < bricks.length; i++) {
    let [x1, y1, z1] = bricks[i][0]
    let [x2, y2, z2] = bricks[i][1]
    let minX = Math.min(x1, x2)
    let maxX = Math.max(x1, x2)
    let minY = Math.min(y1, y2)
    let maxY = Math.max(y1, y2)
    let minZ = Math.min(z1, z2)
    let maxZ = Math.max(z1, z2)

    let wholeBrick = []
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          wholeBrick.push([x, y, z])
        }
      }
    }

    wholeBricks.push(wholeBrick)
  }

  let res = 0
  let supportingIndexes = new Set()
  for (let i = 0; i < wholeBricks.length; i++) {
    let wholeBrick = wholeBricks[i]

    let z = wholeBrick[0][2]
    let sum = 0
    while (z > 1) {
      let stoppingBricks = []
      let anyBrickBelow = false

      for (let otherI = 0; otherI < wholeBricks.length; otherI++) {
        let other = wholeBricks[otherI]

        if (i === otherI) continue

        let hasBrickBelow = false
        for (let cube of wholeBrick) {
          let [x1, y1, z1] = cube

          for (let otherCube of other) {
            let [x2, y2, z2] = otherCube

            if (x1 === x2 && y1 === y2 && z1 === z2 + 1) {
              hasBrickBelow = true
              anyBrickBelow = true
              break
            }
          }

          if (hasBrickBelow) break
        }

        if (hasBrickBelow) {
          stoppingBricks.push(otherI)
        }
      }

      if (stoppingBricks.length === 1) {
        supportingIndexes.add(stoppingBricks[0])
      }

      if (anyBrickBelow) break

      z--

      for (let j = 0; j < wholeBrick.length; j++) {
        wholeBricks[i][j][2]--
      }

      bricks[i][0][2]--
      bricks[i][1][2]--
    }

    res += sum
  }

  return wholeBricks.length - supportingIndexes.size
}

export const part2 = input => {
  let bricks = input
    .toLines()
    .map(line => line.split('~').map(pos => pos.getNums()))

  bricks = bricks.toSorted((a, b) => {
    let [, , z1] = a[0]
    let [, , z2] = b[0]
    return z1 - z2
  })

  let wholeBricks = []
  for (let i = 0; i < bricks.length; i++) {
    let [x1, y1, z1] = bricks[i][0]
    let [x2, y2, z2] = bricks[i][1]
    let minX = Math.min(x1, x2)
    let maxX = Math.max(x1, x2)
    let minY = Math.min(y1, y2)
    let maxY = Math.max(y1, y2)
    let minZ = Math.min(z1, z2)
    let maxZ = Math.max(z1, z2)

    let wholeBrick = []
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          wholeBrick.push([x, y, z])
        }
      }
    }

    wholeBricks.push(wholeBrick)
  }

  let res = 0
  let supportingIndexes = new Set()
  let stoppingBricksDict = {}
  let stoppingBricksDict2 = {}
  for (let i = 0; i < wholeBricks.length; i++) {
    let wholeBrick = wholeBricks[i]
    let z = wholeBrick[0][2]
    let sum = 0

    while (z > 1) {
      let stoppingBricks = []
      let anyBrickBelow = false

      for (let otherI = 0; otherI < wholeBricks.length; otherI++) {
        let other = wholeBricks[otherI]

        if (i === otherI) continue

        let hasBrickBelow = false
        for (let cube of wholeBrick) {
          let [x1, y1, z1] = cube

          for (let otherCube of other) {
            let [x2, y2, z2] = otherCube

            if (x1 === x2 && y1 === y2 && z1 === z2 + 1) {
              hasBrickBelow = true
              anyBrickBelow = true
              break
            }
          }

          if (hasBrickBelow) break
        }

        if (hasBrickBelow) {
          stoppingBricks.push(otherI)
          stoppingBricksDict[i] = stoppingBricks

          stoppingBricksDict2[otherI] ??= []
          stoppingBricksDict2[otherI].push(i)
        }
      }

      if (stoppingBricks.length === 1) {
        supportingIndexes.add(stoppingBricks[0])
      }

      if (anyBrickBelow) break

      z--

      for (let j = 0; j < wholeBrick.length; j++) {
        wholeBricks[i][j][2]--
      }

      bricks[i][0][2]--
      bricks[i][1][2]--
    }

    res += sum
  }

  let count = 0
  let unique = new Set()
  for (let si of [...supportingIndexes]) {
    let queue = [si]

    while (queue.length > 0) {
      let currentSupporting = queue.shift()
      let d = stoppingBricksDict2[currentSupporting]

      d?.forEach(s => {
        let t = [...stoppingBricksDict[s]]
        let exceptionFound = false

        while (t !== undefined && t.length > 0) {
          let currentT = t.shift()

          if (currentT === si) continue

          let a = stoppingBricksDict[currentT]

          if (a === undefined) {
            exceptionFound = true
            break
          } else {
            t.push(...a)
          }
        }

        if (!exceptionFound) {
          unique.add(s)
          queue.push(s)
        }
      })
    }

    count += unique.size
    unique = new Set()
  }

  return count
}
