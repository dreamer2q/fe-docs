/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  if (deadends.includes("0000")) return -1;
  let depth = 0;
  let visited = new Map();
  let q = ["0000"];
  visited.set("0000", true);

  while (q.length > 0) {
    const subq = q;
    q = [];
    for (const curr of subq) {
      if (target === curr) {
        return depth;
      }
      let arr = curr.split("").map((e) => parseInt(e, 10));
      for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        for (let sig of [-1, 1]) {
          arr[i] = (num + sig + 10) % 10;
          let step = arr.map(String).join("");
          if (visited.get(step)) continue;
          visited.set(step, true);
          if (deadends.includes(step)) continue;
          q.push(step);
        }
        arr[i] = num;
      }
    }
    depth++;
  }
  return -1;
};

const tests = [
  {
    deadends: ["0000"],
    target: "8888",
    expect: -1,
  },
  {
    deadends: ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"],
    target: "8888",
    expect: -1,
  },
  {
    deadends: ["8888"],
    target: "0009",
    expect: 1,
  },
];

for (let i = 0; i < tests.length; i++) {
  const { deadends, target, expect } = tests[i];

  let ans = openLock(deadends, target);
  if (ans === expect) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: got ${ans}, expect ${expect}`);
  }
}
