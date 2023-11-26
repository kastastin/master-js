slow = cachingDecorator(slow);

function slow(x) {
  // resource-intensive computing ...
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(fn) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) return cache.get(x);

    let result = fn(x);

    cache.set(x, result);
    return result;
  };
}
