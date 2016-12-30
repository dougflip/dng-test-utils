/**
 * Simple test module used by the actual test to verify things like:
 *
 *  - bootstrapping modules (in a test)
 *  - working with null mock
 *  - working with promises
 */
const ng = window.angular;

function promiseMathLegacy($q) {
  return {
    promiseToSquare(x) {
      return $q(resolve => resolve(x * x));
    },
    promiseToAdd(x, y) {
      return $q(resolve => resolve(x + y));
    }
  }
}

function promiseMath($q) {
  /**
   * Something like this would have previously broken null mock.
   * The new style of creating a test module for you and using decorators
   * does not have this limitation
   */
  const d = $q.defer();

  return promiseMathLegacy($q);
}

const name = ng.module('dngTestModule', [])
  .factory('promiseMathLegacy', promiseMathLegacy)
  .factory('promiseMath', promiseMath)
  .name;

export default {
  name,
  promiseMathLegacy
}
