/**
 * 简陋的 clone
 * @param {any} obj
 * @returns {any}
 */
export function clone0(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 单层基础 clone
 * @param {Object} obj
 */
export function clone1(obj) {
  let target = {};
  for (const key in obj) {
    target[key] = obj[key];
  }
  return target;
}

/**
 * 简单 clone 考虑嵌套
 * @param {any} obj
 */
export function clone2(obj) {
  if (typeof obj === "object") {
    let target = {};
    for (const key in obj) {
      target[key] = clone2(obj[key]);
    }
    return target;
  } else {
    return obj;
  }
}

/**
 * 简单 clone 考虑数组
 * @param {any} obj
 */
export function clone3(obj) {
  if (typeof obj === "object") {
    let target = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      target[key] = clone3(obj[key]);
    }
    return target;
  } else {
    return obj;
  }
}

/**
 * 简单 clone 考虑循环引用
 * @param {any} obj
 */
export function clone4(obj, map = new WeakMap()) {
  if (typeof obj === "object") {
    let target = Array.isArray(obj) ? [] : {};
    if (map.get(obj)) {
      return map.get(obj);
    }
    map.set(obj, target);
    for (const key in obj) {
      target[key] = clone4(obj[key]);
    }
    return target;
  } else {
    return obj;
  }
}

/**
 * 更复杂的 clone 就不弄了又用不到
 */