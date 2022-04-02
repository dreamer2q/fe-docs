/* 
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let res = [];
  backtrack(nums, 0, res);
  console.log(res);
};

let tmp = [];
/**
 *
 * @param {number[]} nums
 * @param {number} i
 * @param {number[]} res
 */
function backtrack(nums, i, res) {
  res.push([...tmp]);
  for (let b = i; b < nums.length; b++) {
    tmp.push(nums[b]);
    backtrack(nums, b + 1, res);
    tmp.pop();
  }
}

subsets([1, 2, 3]);
