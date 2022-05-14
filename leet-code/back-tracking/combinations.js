/**
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。
*/

/**
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
] 
*/

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let res = [];
  backtrack(n, k, 1, res);
  return res;
};

let tmp = [];
/**
 *
 * @param {number} n
 * @param {number} k
 * @param {number} i
 * @param {number[][]} res
 */
function backtrack(n, k, i, res) {
  if (tmp.length === k) {
    res.push([...tmp]);
  }

  for (let b = i; b <= n; b++) {
    tmp.push(b);
    backtrack(n, k, b + 1, res);
    tmp.pop();
  }
}

let res = combine(4, 2);
console.log(res);
