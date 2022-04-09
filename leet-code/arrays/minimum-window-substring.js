/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let need = new Map();
  let window = new Map();

  for (let c of t) need.set(c, (need.get(c) || 0) + 1);

  let left = 0;
  let right = 0;
  let min_len = Infinity;
  let min_left = 0;
  let valid = 0;

  while (right < s.length) {
    let c = s[right];
    right++;
    if (need.get(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    while (valid === need.size) {
      if (min_len > right - left) {
        // update answer
        min_len = right - left;
        min_left = left;
      }

      let c = s[left];
      left++;
      if (need.get(c)) {
        if (window.get(c) === need.get(c)) {
          valid--;
        }
        window.set(c, window.get(c) - 1);
      }
    }
  }

  if (min_len === Infinity) {
    return "";
  }
  return s.substring(min_left, min_left + min_len);
};

const tests = [
  {
    s: "aa",
    t: "aa",
    expect: "aa",
  },
];

for (let i = 0; i < tests.length; i++) {
  let { s, t, expect } = tests[i];
  let ans = minWindow(s, t);

  if (ans === expect) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: got ${ans}, expect: ${expect}`);
  }
}
