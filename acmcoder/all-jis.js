/**
题目描述：
小团很喜欢中位数。现在给定一个序列，若其长度为奇数，那么其中位数是将序列中的数从小到大排序后位于正中间位置的数；
若其长度为偶数，那么其中位数是将序列中的数从小到大排序后位于最中间的两个数的平均值。

现在给你一个长度为n的序列，小团想知道所有长度为奇数的区间的中位数之和为多少。

输入描述
第一行一个正整数n，表示序列中有n个数。

接下来一行n个空格隔开的正整数a1,a2,…an表示序列中n个数的值。

1<=n<=2000, 1<=ai<=100000，保证ai互不相同。

输出描述
一行一个正整数，表示给定序列中所有长度为奇数的区间的中位数之和。

样例输入
4
2 3 1 4
样例输出
15

提示
样例解释

长度为奇数的区间有[2], [3], [1], [4], [2 3 1], [3 1 4]

答案为2+3+1+4+2+3=15
 */

/**
 * @param {number[]} nums
 */
function getSums(nums) {
  let len = nums.length;
  if (len % 2 === 0) {
    len -= 1;
  }

  let sum = nums.reduce((a, b) => a + b);

  for (let i = 3; i <= len; i += 2) {
    for (let j = 0; j <= nums.length - i; j++) {
      // j, j+i;
      let res = getMiddle(nums, j, j + i - 1);
      sum += res;
    }
  }

  return sum;
}

/**
 *
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 */
function getMiddle(nums, left, right) {
  let arr = []; // 长度一定是奇数
  for (let i = left; i <= right; i++) {
    arr.push(nums[i]);
  }
  arr.sort();
  let mid = Math.floor(arr.length / 2);
  return arr[mid];
}

const tests = [
  {
    nums: [2, 3, 1],
    expect: 8,
  },
  {
    nums: [2, 3, 1, 4],
    expect: 15,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = getSums(test.nums);
  if (res != test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
