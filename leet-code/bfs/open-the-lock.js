/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  let minStep = 0;
  let q = ["0000"];
  let visited = new Map();
  visited["0000"] = true;

  while (q.length > 0) {
    let rows = [...q];
    q = [];
    for (let row of rows) {
      if (row === target) {
        return minStep;
      }

      let arr = row.split("");
      function trySolution() {
        let k = arr.join("");
        let isLocked = (deadends.includes(k) || visited.get(k) || false);
        if (!isLocked) {
          visited.set(k, true);
          q.push(k);
        }
        // console.log(`try: ${k}, ${isLocked}`);
      }

      for (let i = 0; i < 4; i++) {
        let num = parseInt(arr[i]);
        arr[i] = nextNumber(num).toString();
        trySolution();
        arr[i] = prevNumber(num).toString();
        trySolution();
        arr[i] = num.toString();
      }
    }
    minStep++;
  }

  return -1;
};

function nextNumber(num) {
  return (num + 1) % 10;
}

function prevNumber(num) {
  return (num + 9) % 10;
}

const tests = [
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
