import '../utils.js'

const getWf = (wf, parts) => {
  for (let cond of wf) {
    if (!cond.includes(':')) return cond

    let [comp, newWf] = cond.split(':')

    if (comp.includes('<')) {
      let [b, a] = comp.split('<')
      if (parts[b] < +a) return newWf
    } else if (comp.includes('>')) {
      let [b, a] = comp.split('>')
      if (parts[b] > +a) return newWf
    }
  }
}

let getRangesProd = ranges => {
  let prod = 1
  for (let [name, range] of Object.entries(ranges)) {
    if (!['x', 'm', 'a', 's'].includes(name)) continue
    prod *= range[1] - range[0] + 1
  }
  return prod
}

export const part1 = input => {
  let [wfs, ratings] = input.toBlocks()

  wfs = wfs.reduce((acc, wf) => {
    let [name, ...rules] = wf.split(/[{,}]/).slice(0, -1)
    acc[name] = rules
    return acc
  }, {})

  let aCount = 0
  for (let i = 0; i < ratings.length; i++) {
    let rating = ratings[i].slice(1, -1)

    let parts = {}
    for (let part of rating.split(',')) {
      let [name, val] = part.split('=')
      parts[name] = +val
    }

    let wf = 'in'
    while (!['A', 'R'].includes(wf)) {
      wf = getWf(wfs[wf], parts)
    }

    if (wf === 'A') aCount += rating.getNums().sum()
  }

  return aCount
}

export const part2 = input => {
  let [wfs] = input.toBlocks()

  wfs = wfs.reduce((acc, wf) => {
    let [name, ...rules] = wf.split(/[{,}]/).slice(0, -1)
    acc[name] = rules
    return acc
  }, {})

  let getPerms = (wf, ranges) => {
    if (wf === 'A') return getRangesProd(ranges)
    if (wf === 'R') return 0

    let sum = 0
    for (let cond of wfs[wf]) {
      if (!cond.includes(':')) {
        sum += getPerms(cond, ranges)
        continue
      }

      let [comp, newWf] = cond.split(':')

      if (comp.includes('<')) {
        let [cat, val] = comp.split('<')
        let newMax = +val - 1

        sum += getPerms(newWf, {
          ...ranges,
          [cat]: [ranges[cat][0], newMax]
        })

        ranges = {
          ...ranges,
          [cat]: [newMax + 1, ranges[cat][1]]
        }
      } else if (comp.includes('>')) {
        let [cat, val] = comp.split('>')
        let newMin = +val + 1

        sum += getPerms(newWf, {
          ...ranges,
          [cat]: [newMin, ranges[cat][1]]
        })

        ranges = {
          ...ranges,
          [cat]: [ranges[cat][0], newMin - 1]
        }
      }
    }

    return sum
  }

  let ranges = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }

  return getPerms('in', ranges)
}
