/**
 * 给你一个整数数组 nums
 * 请你找出一个具有最大和的连续子数组（子数组最少包含一个元素）
 * 返回其最大和。
 * 子数组 是数组中的一个连续部分。
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  /**
   * dp[i] 代表 以 nums[i] 结尾的最大和
   * 针对每一个 nums[i] 要么它属于前一个子数组
   * 要么它属于自己开始的一个子数组
   */
  let dp = Array(nums.length);
  dp[0] = nums[0];
  let ans = dp[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    if (dp[i] > ans) {
      ans = dp[i];
    }
  }

  return ans;
};

const tests = [
  {
    nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    expect: 6,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = maxSubArray(test.nums);
  if (res != test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
