/**
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 */

/**
 * 最长不重复子串暴力搜索
 * @param {string} s
 */
function getLNRS1(s) {
  "use strict";

  let maxLen = 1;
  let index = 0;

  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.clear();
    map.set(s.charAt(i), true);
    let j = i + 1;
    for (; j < s.length; j++) {
      if (map.get(s.charAt(j))) {
        break;
      }
      map.set(s.charAt(j), true);
    }

    if (j - i > maxLen) {
      maxLen = j - i;
      index = i;
    }
  }

  return s.substring(index, index + maxLen);
}

/**
 * 最长不重复子串，DP
 * @param {string} s
 */
function getLNRS2(s) {
  let maxLen = 1;
  let index = 0;
  let lastIndex = 0;
  let dp = [];
  dp[0] = 1;
  for (let i = 1; i < s.length; i++) {
    for (let j = i - 1; j >= lastIndex; j--) {
      if (s.charAt(j) == s.charAt(i)) {
        dp[i] = i - j;
        lastIndex = j + 1;
        break;
      } else if (j == lastIndex) {
        dp[i] = dp[i - 1] + 1;
      }
    }

    if (dp[i] > maxLen) {
      maxLen = dp[i];
      index = i + 1 - maxLen;
    }
  }

  return s.substring(index, index + maxLen);
}

/**
 * 最长无重复子串，DP+HASH
 * @param {string} s
 */
function getLNRS3(s) {
  let index = 0;
  let maxLen = 1;
  let lastIndex = 0;

  let map = new Map();
  let dp = [];
  dp[0] = 1;
  for (let i = 1; i < s.length; i++) {
    let j = map.get(s[i]);
    if (j && lastIndex <= j) {
      // 已经存在过
      dp[i] = i - j;
      lastIndex = j + 1;
    } else {
      // 没有存在
      dp[i] = dp[i - 1] + 1;
    }
    map.set(s[i], i);

    if (dp[i] > maxLen) {
      maxLen = dp[i];
      index = i - maxLen + 1;
    }
  }

  return s.substring(index, index + maxLen);
}

/**
 * 最长无重复子串，HASH
 * @param {string} s
 */
function getLNRS4(s) {
  let index = 0;
  let maxLen = 1;
  let lastIndex = 0;

  let map = new Map();
  map.set(s[0], 0);
  let currLen = 1; // 存上一次最优解长度，优化掉dp数组
  for (let i = 1; i < s.length; i++) {
    let pos = map.get(s[i]);
    if (pos != null && lastIndex <= pos) {
      currLen = i - pos;
      lastIndex = pos + 1;
    } else {
      currLen++;
    }
    map.set(s[i], i);

    if (currLen > maxLen) {
      maxLen = currLen;
      index = i - maxLen + 1;
    }
  }

  return s.substring(index, index + maxLen);
}

/**
 * 最长无重复子串，滑动窗口
 * 滑动窗口可以理解为一个队列，我们维护一个当前满足题目要求的队列，
 * 保存队列中历史最长的节点就是我们的最优解
 * @param {string} s
 */
function getLNRS5(s) {
  let que = []; // 维护队列
  let ansIndex = 0;
  let ansLen = 1;

  que.push(s[0]);
  for (let i = 1; i < s.length; i++) {
    if (que.includes(s[i])) {
      // 已经存在
      do {
        que.shift();
      } while (que.includes(s[i]));
    }
    que.push(s[i]);

    if (que.length > ansLen) {
      ansLen = que.length;
      ansIndex = i - ansLen + 1;
    }
  }

  return s.substring(ansIndex, ansIndex + ansLen);
}

const tests = [
  { s: "acacdefgafg", expect: "acdefg" },
  { s: "adacdefgafg", expect: "acdefg" },
  { s: "aeacdefgafg", expect: "acdefg" },
  { s: "aaebccddfghillkksjik", expect: "dfghil" },
];

for (let i = 0; i < tests.length; i++) {
  const test = tests[i];
  const r = getLNRS5(test.s);
  if (r == test.expect) {
    console.log(`${i}: pass`);
  } else {
    console.log(`${i}: got ${r}, expect: ${test.expect}`);
  }
}
