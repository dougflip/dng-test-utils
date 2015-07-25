import dngTestUtils from '../src/test-utils';
import sampleModule, { promiseMath } from './test-module';

import diMock from '../src/di-mock';
import nullMock from '../src/nullmock';

describe('DngTestUtils', () => {

  const ngMock = angular.mock;
  let mocks;

  beforeEach(ngMock.module(dngTestUtils.name));
  beforeEach(ngMock.module(sampleModule.name));

  beforeEach(() => {
    // Create a single "mock" object to identify all of our dependencies
    // The property names need to match the actual dependency names
    //  because diMock will use the propety names register them with DI
    // So in this example a dependency/provider named "sampleValue"
    mocks = {
      promiseMath: nullMock(promiseMath)
    }

    ngMock.module(diMock(mocks));
  });

  describe('promiseGenerator', () => {

    let promiseToSquare;

    beforeEach(ngMock.inject((dngDefer) => {
      // This sets up any Jasmine spy to properly return a wrapped deferred
      //  { resolveAndDigest, rejectAndDigest }
      promiseToSquare = dngDefer(mocks.promiseMath.promiseToSquare);
    }));

    it('should create a deferred which can be resolved', (done) => {
      mocks.promiseMath.promiseToSquare().then(done);
      promiseToSquare.resolveAndDigest();
    });

    it('should create a deferred which can be rejected', (done) => {
      mocks.promiseMath.promiseToSquare().catch(done);
      promiseToSquare.rejectAndDigest();
    });

  });

});
