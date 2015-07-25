import promiseGenerator from "./promise-generator";
import nullMock from "./nullmock";

// FIXME: Is there any way around this?
const ng = window.angular;

export default ng.module('dngTestUtils', [])
  .factory('dngDefer', promiseGenerator)
  .factory('dngNullMock', () => nullMock);
