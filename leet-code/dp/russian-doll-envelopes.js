/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  // 最长递增子序列的变种
  // 从一维变成了二维的问题
  // 解决思路是如何将二维降低成一维
  // 由题目可，必须要要(宽度x高度)都大才能进行套娃
  // 如果我们将某一个属性按照从大到小的进行排序
  // 这样求解问题的时候就可以不用考虑这个属性带来的影响了
  // 因此我们成功的将问题降维成了标准的 LIS 问题了

  // 以宽度降序, 高度升序
  envelopes.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  // 普通的 dp 已经过不了测试用例了
  // 需要使用更高效率的二分查找进行 dp
  // 但是这个时候 dp 数组的含义就变化了
  let dp = new Array(envelopes.length);

  dp[0] = envelopes[0][1];
  let sz = 1;

  for (let i = 1; i < envelopes.length; i++) {
    let num = envelopes[i][1];
    if (num > dp[sz - 1]) {
      // 大于前一个符合最长递增子序列的条件
      dp[sz++] = num;
    } else {
      // 不满足条件, 向前寻找到一个满足大于条件的位置
      // 然后将 num 存放到它的后面
      // 由于 dp 是严格递增的, 因此可以使用二分查找提升效率
      let lb = lower_bound(dp, sz, num);
      dp[lb] = num;
    }
  }

  return sz;
};

/**
 * @param {number[]} nums
 * @param {number} sz
 * @param {number} target
 * @returns {number}
 */
function lower_bound(nums, sz, target) {
  let left = 0;
  let right = sz;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    } else {
      // found, do not return
      right = mid; // 向左边逼近
    }
  }

  return left;
}

const tests = [
  {
    envelopes: [
      [4, 5],
      [4, 6],
      [6, 7],
      [2, 3],
      [1, 1],
      [1, 1],
    ],
    expect: 4,
  },
  {
    envelopes: [
      [4, 5],
      [4, 6],
      [6, 7],
      [2, 3],
      [1, 1],
    ],
    expect: 4,
  },
  {
    envelopes: [
      [5, 4],
      [6, 4],
      [6, 7],
      [2, 3],
    ],
    expect: 3,
  },
];

for (let i = 0; i < tests.length; i++) {
  const { envelopes, expect } = tests[i];
  let ans = maxEnvelopes(envelopes);
  if (ans != expect) {
    console.log(`${i}: got ${ans}, expect ${expect}`);
  } else {
    console.log(`${i}: passed`);
  }
}
