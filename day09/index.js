import '../utils.js'

export const part1 = input => {
  const extrapolate = nums => {
    let newNums = nums.reduce((acc, cur, i) => {
      let newNum = nums[i + 1] - cur
      if (isNaN(newNum)) return acc
      acc.push(newNum)
      return acc
    }, [])

    if (newNums.count(0) === newNums.length) {
      return nums.pop()
    }

    return nums.pop() + extrapolate(newNums)
  }

  return input
    .toLines()
    .map(line => {
      let nums = line.getNums()
      return extrapolate(nums)
    })
    .sum()
}

export const part2 = input => {
  const extrapolate = nums => {
    let newNums = nums.reduce((acc, cur, i) => {
      let newNum = cur - nums[i + 1]
      if (isNaN(newNum)) return acc
      acc.push(newNum)
      return acc
    }, [])

    if (newNums.count(0) === newNums.length) {
      return nums.pop()
    }

    return nums.pop() - extrapolate(newNums)
  }

  return input
    .toLines()
    .map(line => {
      let nums = line.getNums().reverse()
      return extrapolate(nums)
    })
    .sum()
}
