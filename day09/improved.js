import '../utils.js'

export const part1 = input => {
  const extrapolate = nums => {
    let newNums = nums.map((n, i) => (i ? n - nums[i - 1] : n)).slice(1)
    return newNums.some(n => n) ? nums.pop() + extrapolate(newNums) : nums.pop()
  }

  return input
    .toLines()
    .map(line => extrapolate(line.getNums()))
    .sum()
}

export const part2 = input => {
  const extrapolate = nums => {
    let newNums = nums.map((n, i) => (i ? nums[i - 1] - n : n)).slice(1)
    return newNums.some(n => n) ? nums.pop() - extrapolate(newNums) : nums.pop()
  }

  return input
    .toLines()
    .map(line => extrapolate(line.getNums().reverse()))
    .sum()
}
