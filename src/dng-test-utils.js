import nullMock from "./dng-null-mock";
import promiseGenerator from "./dng-defer";
import dngModule from './dng-module';

// FIXME: Is there any way around this?
const ng = window.angular;

const dngTestModule = ng.module('dngTestUtils', [])
  .factory('dngDefer', promiseGenerator)
  .factory('dngNullMock', () => nullMock);

export default {
  name: dngTestModule.name,
  nullMock: nullMock,
  init: dngModule.init
}
