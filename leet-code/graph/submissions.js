/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // 1. 构建有向图
  let buildGraph = () => {
    let gh = [];
    for (let [to, from] of prerequisites) {
      if (!gh[to]) gh[to] = [];
      gh[to].push(from);
    }
    return gh; // 邻接表
  };

  // 2. 判断有向图是否存在换
  // 如果存在说明无法修完, 否则可以
  let hasCycle = false;
  let visited = [];
  let onPath = [];
  let traverse = (gh, i) => {
    if (onPath.includes(i)) {
      hasCycle = true; // 路径中出现之前的节点说明存在环
    }
    if (hasCycle || visited[i]) return;
    visited[i] = true;
    onPath.push(i); // 加入到当前路径中
    for (let n of gh[i] || []) {
      traverse(gh, n); // 开启新一轮的遍历
    }
    onPath.pop(); // 从当前路径中移除
  };

  let dag = buildGraph();
  for (let i = 0; i < numCourses; i++) {
    traverse(dag, i);
  }

  return !hasCycle;
};

const tests = [
  {
    num: 2,
    pres: [[1, 0]],
    expect: true,
  },
  {
    num: 2,
    pres: [
      [0, 1],
      [1, 0],
    ],
    expect: false,
  },
];

for (let i = 0; i < tests.length; i++) {
  const { num, pres, expect } = tests[i];
  const res = canFinish(num, pres);
  if (res !== expect) {
    console.log(`${i}: expect ${expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
