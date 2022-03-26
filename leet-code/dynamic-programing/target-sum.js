/**
 * 目标和
 * 给你一个整数数组 nums 和一个整数 target 。
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  // 回溯算法求解
  // 时间复杂度 O(2^n)
  // 原因在于重复子问题，造成的重复计算
  // 可以使用 memo 备忘录来降低
  // 即使这样，复杂度也是很高
  let result = 0;

  /**
   *
   * @param {number} i
   */
  function backtrack(i) {
    if (i === nums.length) {
      if (target == 0) {
        result++;
      }
      return;
    }

    // 选择 -
    target -= nums[i];
    backtrack(i + 1);
    // 撤销选择
    target += nums[i];

    // 选择 +
    target += nums[i];
    backtrack(i + 1);
    // 撤销选择
    target -= nums[i];
  }

  backtrack(0);

  return result;
};

/**
 * 为了进一步降低复杂度，提升效率，可以将问题进行转化
 * 将其转化成一个子集合问题
 * 如果我们把 nums 划分成两个子集 A 和 B，分别代表分配 + 的数和分配 - 的数，那么他们和 target 存在如下关系：
 *
 * sum(A) - sum(B) = target                     ....1
 * sum(A) = target + sum(B)                     ....2
 * sum(A) + sum(A) = target + sum(B) + sum(A)   ....3
 * 2 * sum(A) = target + sum(nums)              ....4
 *
 * 综上，可以推出
 * sum(A) = (target + sum(nums)) / 2            ....5
 *
 * 也就是把原问题转化成：nums 中存在几个子集 A，使得 A 中元素的和为 (target + sum(nums)) / 2
 */

/**
 * 变成背包问题的标准形式：
 * 有一个背包，容量为 sum，
 * 现在给你 N 个物品，
 * 第 i 个物品的重量为 nums[i - 1]（注意 1 <= i <= N），
 * 每个物品只有一个，请问你有几种不同的方法能够恰好装满这个背包
 */

/**
 *
 * @param {number[]} nums
 * @param {number} target
 */
function findTargetSumWays2(nums, target) {
  let sum = nums.reduce((p, v) => p + v);
  if (sum < Math.abs(target) || (sum + target) % 2 == 1) {
    return 0;
  }
  return subsets(nums, (sum + target) / 2);
}

/**
 * 计算 nums 有几个子集合的和为 num
 * @param {number[]} nums
 * @param {number} num
 */
function subsets(nums, num) {
  /**
   * dp[i][j] = x 表示，若只在前 i 个物品中选择，若当前背包的容量为 j，则最多有 x 种方法可以恰好装满背包
   */
  let dp = [];
  for (let i = 0; i <= nums.length; i++) {
    /**
     * 进一步优化，使用一维数组，从后向前遍历
     */
    dp[i] = new Array(num + 1);
    dp[i].fill(0);
  }
  dp[0][0] = 1; // base case

  for (let i = 1; i <= nums.length; i++) {
    for (let j = 0; j <= num; j++) {
      if (j >= nums[i - 1]) {
        // 选择 i 的结果和不选择 i 的结果和
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]];
      } else {
        // 空间不足，不选择 i 物品
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[nums.length][num];
}

const tests = [
  {
    nums: [1, 2, 3, 5],
    target: 0,
    expect: 0,
  },
  {
    nums: [1],
    target: 2,
    expect: 0,
  },
  {
    nums: [7, 9, 3, 8, 0, 2, 4, 8, 3, 9],
    target: 0,
    expect: 0,
  },
  {
    nums: [1, 1, 1, 1, 1],
    target: 3,
    expect: 5,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = findTargetSumWays2(test.nums, test.target);
  if (res == test.expect) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  }
}
