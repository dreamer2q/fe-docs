import { equals } from "../base/equals.js";

/*
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。
*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let s = 0;
  let p = 0;
  while (p < nums.length) {
    if (nums[p] !== 0) {
      swap(nums, s, p);
      s++;
    }
    p++;
  }
};

/**
 *
 * @param {number[]} nums
 * @param {number} i
 * @param {number} j
 */
function swap(nums, i, j) {
  if (i !== j) {
    let t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
  }
}

const tests = [
  {
    nums: [0],
    expect: [0],
  },
  {
    nums: [0, 1, 0, 3, 12],
    expect: [1, 3, 12, 0, 0],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let nums = [...test.nums];
  moveZeroes(nums);
  if (equals(nums, test.expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.expect}, got ${nums}`);
  }
}
