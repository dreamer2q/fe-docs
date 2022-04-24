/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  /**
   * 核心点在于中心点的选择
   * 有奇偶子分，针对每个中心点都需要进行判断和检查
   */
  let index = 0;
  let maxlen = 1;
  for (let i = 0; i < s.length; i++) {
    let len1 = palindrome(s, i, i);
    let len2 = palindrome(s, i, i + 1);
    let len = Math.max(len1, len2);
    if (len > maxlen) {
      index = i - Math.floor((len - 1) / 2);
      maxlen = len;
    }
  }
  return s.substring(index, index + maxlen);
};

/**
 * 返回以 l,r 为中心点的最长回文长度
 * @param {string} s
 * @param {number} l 中心点左边
 * @param {number} r 中心点右边
 */
function palindrome(s, l, r) {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return r - l - 1;
}

const tests = [
  {
    s: "abccccdd",
    expect: "cccc",
  },
  {
    s: "ccc",
    expect: "ccc",
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let len = longestPalindrome(test.s);
  if (len !== test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${len}`);
  } else {
    console.log(`${i}: passed`);
  }
}
