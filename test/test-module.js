// This is a test module to help demo
const ng = window.angular;

export function promiseMath ($q) {
  return {
    promiseToSquare (x) {
      return $q((resolve) => resolve(x * x));
    },
    promiseToAdd (x, y) {
      return $q((resolve) => resolve(x + y));
    }
  }
}

export default ng.module('dngTestModule', [])
  .factory('promiseMath', promiseMath);
