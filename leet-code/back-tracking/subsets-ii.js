/* 
给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
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
 * @param {number[][]} res
 */
function backtrack(nums, i, res) {
  let index = res.findIndex((a) => isArrayEqual(a, tmp));
  if (index === -1) {
    res.push([...tmp]);
  }
  for (let b = i; b < nums.length; b++) {
    let num = nums[b];
    tmp.push(num);
    backtrack(nums, b + 1, res);
    tmp.pop();
  }
}

/**
 * 判断两个数组元素是否相等（顺序可以不一致）
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {boolean} 是否一致
 */
function isArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let cmp = (a, b) => a - b;

  let a1 = JSON.stringify([...arr1].sort(cmp));
  let a2 = JSON.stringify([...arr2].sort(cmp));
  return a1 === a2;
}

subsets([1, 1, 2, 2]);
