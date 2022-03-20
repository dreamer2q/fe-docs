/**
 * 简单对比两个对象是否相等
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns
 */
export function equals(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function deepEqual() {}
