import diMock from "./di-mock";
import nullMock from "./nullmock";
import promiseGenerator from "./promise-generator";

// FIXME: Is there any way around this?
const ng = window.angular;

const dngTestModule = ng.module('dngTestUtils', [])
  .factory('dngDefer', promiseGenerator)
  .factory('dngNullMock', () => nullMock);

export default {
  name: dngTestModule.name,
  registerMocks: diMock,
  nullMock: nullMock
}
