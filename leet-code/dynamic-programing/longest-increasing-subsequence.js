/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  /**
   * dp[i] 代表 以 nums[i] 元素结尾的最长严格递增子序列的长度
   * (子串一定是连续的，而子序列不一定是连续的)
   * 默认值都是 1, 即自己
   */
  let dp = new Array(nums.length + 1);
  dp.fill(1);
  dp[0] = 1;
  let ans = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        if (dp[i] > ans) {
          ans = dp[i];
        }
      }
    }
  }

  return ans;
};

/**
 * 使用二分查找优化上面的算法
 * 时间复杂度为 O(NlgN)
 * @param {number[]} nums
 */
function lengthOfLIS2(nums) {
  let top = new Array(nums);
  let piles = 0; // 当前堆数量
  for (let i = 0; i < nums.length; i++) {
    let poker = nums[i];
    // 寻找一个堆
    let left = 0;
    let right = piles;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (top[mid] > poker) {
        right = mid;
      } else if (top[mid] < poker) {
        // 这里 +1, 防止 left 原地踏步
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    if (left == piles) {
      // 没有找到合适的堆
      piles++;
    }
    top[left] = poker;
  }
  return piles;
}

let tests = [
  {
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    expect: 4,
  },
  {
    nums: [0, 1, 0, 3, 2, 3],
    expect: 4,
  },
  { nums: [7, 7, 7, 7, 7, 7, 7], expect: 1 },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = lengthOfLIS2(test.nums);
  if (res != test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
