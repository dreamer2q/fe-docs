/*
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。
你可以 按任意顺序 返回答案。

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  res = [];
  tmp = [];
  backtrack(nums, nums.length);
  return res;
};

let res = [];

/**
 * @type {number[]}
 */
let tmp = [];

/**
 * @param {number[]} nums
 * @param {number} depth
 */
function backtrack(nums, depth) {
  if (depth === 0) {
    return res.push([...tmp]);
  }

  // 全排序本质是穷举, 需要使用额外变量进行修枝
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];

    /**
     * 全排列需要使用额外的变量用来记录那些数是使用过的
     * 这里偷懒使用 tmp 即作为结果，也作为额外的标记数组
     */
    if (tmp.includes(num)) continue;

    tmp.push(num);
    backtrack(nums, depth - 1);
    tmp.pop();
  }
}

let ans = permute([0, 1, 2]);
console.log(ans);
