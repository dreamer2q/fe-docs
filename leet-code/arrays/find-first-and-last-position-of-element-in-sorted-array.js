/**
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  return [left_bound(nums, target), right_bound(nums, target)];
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function left_bound(nums, target) {
  let left = 0; // 左闭
  let right = nums.length; // 右开
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1; // 由于是左闭区间, 这里需要 +1
    } else if (nums[mid] > target) {
      right = mid; // 由于是开区间, 不需要 +1
    } else {
      // 相等, 需要向左边(收缩)逼近
      right = mid;
    }
  }
  return nums[left] === target ? left : -1;
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function right_bound(nums, target) {
  let left = 0; // 左开
  let right = nums.length; // 右闭
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return nums[right - 1] === target ? right - 1 : -1;
}

const tests = [
  {
    nums: [5, 7, 7, 8, 8, 10],
    target: 6,
    expect: [-1, -1],
  },
];

for (let i = 0; i < tests.length; i++) {
  const { nums, target, expect } = tests[i];
  let ans = searchRange(nums, target);
  if (ans === expect) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${expect}, got ${ans}`);
  }
}
