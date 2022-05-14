/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
  const uf = new UnionFind(256);
  for (const eq of equations) {
    const isEq = eq.charCodeAt(1) === "=".codePointAt(0);
    const a = eq.charCodeAt(0);
    const b = eq.charCodeAt(3);
    if (isEq) {
      uf.union(a, b);
    }
  }
  for (const eq of equations) {
    const isEq = eq.charCodeAt(1) === "=".codePointAt(0);
    const a = eq.charCodeAt(0);
    const b = eq.charCodeAt(3);
    if (!isEq) {
      if (uf.connected(a, b)) return false;
    }
  }

  return true;
};

function UnionFind(n) {
  this.parent = [];
  for (let i = 0; i < n; i++) {
    this.parent.push(i); // 一开始每个都是一个根节点
  }
  this.count = n;
}

UnionFind.prototype.find = function (n) {
  let p = this.parent[n];
  if (n != p) {
    this.parent[n] = this.find(p);
  }
  return this.parent[n];
};

UnionFind.prototype.union = function (a, b) {
  const rootA = this.find(a);
  const rootB = this.find(b);
  if (rootA != rootB) {
    this.parent[rootA] = rootB;
    this.count--;
  }
};

UnionFind.prototype.connected = function (a, b) {
  const rootA = this.find(a);
  const rootB = this.find(b);
  return rootA === rootB;
};

UnionFind.prototype.count = function () {
  return this.count;
};

const tests = [
  {
    equations: ["b==b", "b==e", "e==c", "d!=e"],
    expect: true,
  },
  {
    equations: ["a!=a"],
    expect: false,
  },
  {
    equations: ["a==b", "b==a"],
    expect: true,
  },
  {
    equations: ["a==b", "b!=a"],
    expect: false,
  },
];

for (let i = 0; i < tests.length; i++) {
  const { equations, expect } = tests[i];
  const ans = equationsPossible(equations);
  if (expect != ans) {
    console.log(`${i}: expect ${expect}, got ${ans}`);
  } else {
    console.log(`${i}: passed`);
  }
}
