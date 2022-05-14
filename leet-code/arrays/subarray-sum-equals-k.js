/**
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let sumsCount = new Map();
  sumsCount.set(0, 1); // base case

  let ans = 0;
  let sumi = 0;
  for (let i = 0; i < nums.length; i++) {
    sumi += nums[i];
    let sumj = sumi - k;
    if (sumsCount.get(sumj)) {
      /**
        存在我们需要的值, 更新答案
         */
      ans += sumsCount.get(sumj);
    }
    // 更新哈希表
    sumsCount.set(sumi, (sumsCount.get(sumi) ?? 0) + 1);
  }

  return ans;
};

const tests = [
  {
    nums: [1, -1, 0],
    k: 0,
    expect: 3,
  },
  {
    nums: [1, 1, 1],
    k: 2,
    expect: 2,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = subarraySum(test.nums, test.k);
  if (res !== test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
