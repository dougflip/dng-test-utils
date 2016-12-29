// This is a test module to help demo
const ng = window.angular;

function promiseMath($q) {
  return {
    promiseToSquare(x) {
      return $q(resolve => resolve(x * x));
    },
    promiseToAdd(x, y) {
      return $q(resolve => resolve(x + y));
    }
  }
}

const name = ng.module('dngTestModule', [])
  .factory('promiseMath', promiseMath).name;

export default {
  name,
  promiseMath
}
