/*
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
*/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let s = 0;
  let p = nums.length - 1;
  let len = 0;
  while (s <= p) {
    if (nums[s] === val) {
      while (s <= p && nums[p] === val) {
        p--;
        len++;
      }
      if (s > p) {
        break;
      }
      nums[s] = nums[p];
      p--;
      if (s <= p) {
        len++;
      }
    }
    s++;
  }
  return nums.length - len;
};

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement2 = function (nums, val) {
  let s = 0;
  let p = 0;
  while (p < nums.length) {
    if (nums[p] !== val) {
      nums[s] = nums[p];
      s++;
    }
    p++;
  }
  return s;
};

const tests = [
  {
    nums: [4, 4, 5],
    val: 5,
    expect: 2,
  },
  {
    nums: [3, 3],
    val: 3,
    expect: 0,
  },
  {
    nums: [2],
    val: 3,
    expect: 1,
  },
  {
    nums: [3, 3],
    val: 5,
    expect: 2,
  },
  {
    nums: [1],
    val: 1,
    expect: 0,
  },
  {
    nums: [0, 1, 2, 2, 3, 0, 4, 2],
    val: 2,
    expect: 5,
  },
  {
    nums: [3, 2, 2, 3],
    val: 3,
    expect: 2,
  },
];

// /**
//  * 比较两个数组, 以长度小者为准确
//  * @param {number[]} res
//  * @param {number[]} expect 长度小
//  */
// function compareResult(res, expect) {
//   if (res.length < expect.length) {
//     return false;
//   }
//   for (let i = 0; i < expect.length; i++) {
//     if (res[i] !== expect[i]) {
//       return false;
//     }
//   }
//   return true;
// }

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = removeElement2([...test.nums], test.val);
  if (res === test.expect) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  }
}
