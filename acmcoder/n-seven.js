/**
 *
 * @param {number[]} nums
 */
function nSeven(nums) {
  max = 0;
  dfs(nums, 0, 0);
  return max;
}

let max = 0;
/**
 *
 * @param {number[]} nums
 * @param {number} sum
 * @param {number} index
 */
function dfs(nums, sum, index) {
  if (sum % 7 === 0) {
    if (sum > max) {
      max = sum;
    }
  }
  if (index >= nums.length) {
    return;
  }

  // 选
  dfs(nums, sum + nums[index], index + 1);
  // 不选
  dfs(nums, sum, index + 1);
}

const tests = [
  {
    nums: [1, 3, 6, 6],
    expect: 7,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let ans = nSeven(test.nums);

  if (ans != test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${ans}`);
  } else {
    console.log(`${i}: passed`);
  }
}
