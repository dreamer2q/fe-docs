/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums == null || nums.length < 3) {
    return [];
  }
  let results = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return results; // 第一个数过大

    if (i > 0 && nums[i - 1] == nums[i]) {
      continue; // 过滤重复数字
    }

    let base = nums[i];
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      if (nums[left] + nums[right] + base > 0) {
        right--;
      } else if (nums[left] + nums[right] + base < 0) {
        left++;
      } else {
        results.push([base, nums[left], nums[right]]);
        left++;
        right--;
        while (left < right && nums[left - 1] == nums[left]) left++;
        while (left < right && nums[right + 1] == nums[right]) right--;
      }
    }
  }
  return results;
};

const tests = [
  {
    nums: [-2, 0, 1, 1, 2],
  },
  {
    nums: [2, -3, 0, -2, -5, -5, -4, 1, 2, -2, 2, 0, 2, -4],
  },
  {
    nums: [-1, 0, 1, 2, -1, -4],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let results = threeSum(test.nums);
  console.log(JSON.stringify(results));
}
