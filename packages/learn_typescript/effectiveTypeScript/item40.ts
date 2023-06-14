type shallowEqualFunc = <T extends object>(a: T, b: T) => boolean;

const shallowEqual: shallowEqualFunc = function (a, b) {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== (b as any)[k]) {
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}

function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: Array<any> | null = null;
  let lastResult: any;
  return function (...args: Array<any>) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T;
}

