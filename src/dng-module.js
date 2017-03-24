/**
 * This will eventually just become the dng-test-utils file I think.
 * I need to consider backwards compatibility, but this will be the way to
 *  set up a test moving forward.
 */
const angular = window.angular;
const ngMock = window.angular.mock;

/**
 * Creates a single injectable object `dngMocks` which will contain ALL your null mocks.
 * This is helpful to alias to a local variable inside your test file so that
 * you can easily get access to sutMocks:
 *    `beforeEach(ngMock.inject(dngMocks => sutMocks = dngMocks));`
 * Now in your tests you can do something like:
 *    `promiseToSquare = dngDefer(sutMocks.promiseMath.promiseToSquare);`
 * without the need to inject `dngMocks` everywhere.
 */
const createDngMocks = (nullMocks, customMocks) => $injector => {
  return angular.extend({},
    customMocks,
    nullMocks.reduce((acc, x) => angular.extend({
      [x]: $injector.get(x)
    }, acc), {})
  );
};

/**
 * Registers a module with Angular and includes the provided module you are
 * testing as a dependency.
 * This allows us to accomplish nullmock magic via decorators.
 *
 * NOTE: You should use this OR register dngTestUtils by hand.
 */
const createTestModule = (deps, nullMocks = [], customMocks = {}) => {
  return angular.module('dngTestUtils.module', deps.concat('dngTestUtils'))
    .factory('dngMocks', createDngMocks(nullMocks, customMocks));
};

/**
 * This function puts it all together.
 * It will register the module, set up the decorators, and register with ng-mocks.
 */
const registerAll = (deps, nullMocks, customMocks = {}) => {
  const testMod = createTestModule(deps, nullMocks, customMocks);

  // use decorators to wrap requested dependencies with nullMock
  nullMocks.forEach(x => testMod.decorator(x, ($delegate, dngNullMock) => dngNullMock($delegate)));

  // register the module with ngMock
  ngMock.module(testMod.name);

  // register customMocks (those that aren't nullMocked but need to exist)
  ngMock.module(customMocks)
}

/**
 * Convenience wrapper over `register` to return it as a function.
 * This is nice when using in `beforeEach` calls that expect a function.
 */
const initAll = (deps, nullMocks = [], customMocks = {}) =>
  () => registerAll(deps, nullMocks, customMocks);

const init = (moduleUnderTestName, nullMocks = [], customMocks = {}) =>
  initAll([moduleUnderTestName], nullMocks, customMocks);

export default {
  initAll,
  init
}
