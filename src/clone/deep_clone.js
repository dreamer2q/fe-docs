function deepClone(obj = {}, map = new Map()) {
  if (typeof obj != "object") {
    return obj;
  }

  if (map.get(obj)) {
    return map.get(obj);
  }

  let result = {};

  if (
    obj instanceof Array ||
    Object.prototype.toString(obj) === "[object Array]"
  ) {
    result = [];
  }

  map.set(obj, result);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], map);
    }
  }

  return result;
}

function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
