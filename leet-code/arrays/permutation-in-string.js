/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  let need = new Map();
  let window = new Map();
  for (let c of s1) {
    let v = need.get(c) || 0;
    need.set(c, v + 1);
  }

  let left = 0;
  let right = 0;
  let valid = 0;

  while (right < s2.length) {
    let c = s2[right];
    right++;
    if (need.get(c)) {
      let v = window.get(c) || 0;
      window.set(c, v + 1);
      if (need.get(c) === window.get(c)) {
        valid++;
      }
    }

    while (valid === need.size) {
      if (right - left === s1.length) {
        return true;
      }
      let c = s2[left];
      left++;

      if (need.get(c)) {
        let v = window.get(c) || 0;
        if (need.get(c) === v) {
          valid--;
        }
        window.set(c, v - 1);
      }
    }
  }

  return false;
};

const tests = [
  {
    s1: "ab",
    s2: "eidbaooo",
    expect: true,
  },
];

for (let i = 0; i < tests.length; i++) {
  const { s1, s2, expect } = tests[i];

  let ans = checkInclusion(s1, s2);
  if (ans === expect) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: got ${ans}, expect ${expect}`);
  }
}
