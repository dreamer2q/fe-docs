/**
 * 给定两个字符串 text1 和 text2 返回这两个字符串的最长 公共子序列 的长度
 * 如果不存在 公共子序列 返回 0
 * 一个字符串的 子序列 是指这样一个新的字符串
 * 它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 * 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  /**
   * dp[i][j] 代表 text1[1...i] 和 text2[1...j] 两个字符串的 LCS 长度
   * 状态转移, 要么 text1[i]==text2[j] (即同时存在 lcs 中), dp[i][j] = dp[i-1][j-1] + 1
   * 要不 text1[i] != text2[j] 这样 dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
   */
  /**
   * @type {number[][]} 填充基准数据
   */
  let dp = [];
  for (let i = 0; i <= text1.length; i++) {
    dp.push(new Array(text2.length + 1).fill(0));
  }

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
};

const tests = [
  {
    text1: "abc",
    text2: "def",
    expect: 0,
  },
  {
    text1: "abcde",
    text2: "ace",
    expect: 3,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = longestCommonSubsequence(test.text1, test.text2);
  if (res !== test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
