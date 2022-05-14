import { equals } from "../base/equals.js";

/**
不要把问题想得太复杂，二分查找+冒泡排序完全可以解决
1. 维护一个排过序的滑动窗口数组
2. 使用二分查找检索删除的索引
3. 将需要删除的值替换为需要插入的值
4. 使用局部冒泡排序保证数组顺序
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var medianSlidingWindow = function (nums, k) {
  let res = [];
  let wind = new Array(k);
  for (let i = 0; i < k; i++) {
    wind[i] = nums[i];
  }

  wind.sort((a, b) => a - b); // 这里一点要注意一下, 一点要写不然默认排序结果有问题
  res.push(getMedian(wind));
  for (let i = 0; i < nums.length - k; i++) {
    let index = bsearch(wind, nums[i]);
    wind[index] = nums[i + k];

    while (index < wind.length - 1 && wind[index] > wind[index + 1]) {
      swap(wind, index, index + 1);
      index++;
    }
    while (index > 0 && wind[index] < wind[index - 1]) {
      swap(wind, index, index - 1);
      index--;
    }
    res.push(getMedian(wind));
  }

  return res;
};

/**
 * @param {number[]} nums
 * @param {number} i
 * @param {number} j
 */
function swap(nums, i, j) {
  let tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
}

/**
 *
 * @param {number[]} nums
 */
function getMedian(nums) {
  let len = nums.length;
  let index = Math.floor(len / 2);
  if (len % 2 === 1) {
    return nums[index];
  } else {
    return nums[index] / 2 + nums[index - 1] / 2;
  }
}

/**
 * 二分查找
 * @param {number[]} nums
 * @param {number} num
 */
function bsearch(nums, num) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > num) {
      right = mid - 1;
    } else if (nums[mid] < num) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}

const tests = [
  {
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    k: 3,
    expect: [1, -1, -1, 3, 5, 6],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = medianSlidingWindow(test.nums, test.k);
  if (equals(res, test.expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  }
}
