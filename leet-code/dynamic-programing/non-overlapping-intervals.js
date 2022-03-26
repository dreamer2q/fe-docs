/**
 * 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。
 * 返回 需要移除区间的最小数量，使剩余区间互不重叠 。
 * 输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
 * 输出: 1
 * 解释: 移除 [1,3] 后，剩下的区间没有重叠。
 */

/**
 * 贪心算法属于动态规划的一种, 比动态规范更高效
 * 因为它每一次解都是子问题的最优解(动态规范就需要考虑所有解, 但它消除了重叠子问题)，
 * 合并后成为整个问题的最优解, 因此贪心算法的要求比动态规范更苛刻(解决问题比较窄)
 *
 * 贪心算法往往伴随着排序, 这样才能找到子问题的最优解
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  /**
   * 为了尽可能多的选择区间, 要求就是区间结束的时间早
   * 这样才能尽可能多的安排更多的不重复的区间进来
   */
  intervals.sort((a, b) => a[1] - b[1]);

  let ans = 0;
  let [_, end] = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    let [start2, end2] = intervals[i];
    if (start2 >= end) {
      end = end2;
    } else {
      ans++;
    }
  }

  return ans; // 需要移除的最少区间数量
};

const tests = [
  {
    intervals: [
      [1, 100],
      [11, 22],
      [1, 11],
      [2, 12],
    ],
    expect: 2,
  },
  {
    intervals: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ],
    expect: 1,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = eraseOverlapIntervals(test.intervals);
  if (test.expect != res) {
    console.log(`${i}: got ${res}, expect ${test.expect}`);
  } else {
    console.log(`${i}: passed`);
  }
}
