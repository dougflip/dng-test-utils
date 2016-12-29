import dngTestUtils from '../src/dng-test-utils';
import sampleModule from './test-module';

describe('DngTestUtils', () => {

  const ngMock = angular.mock;
  let mocks;

  beforeEach(ngMock.module(dngTestUtils.name));
  beforeEach(ngMock.module(sampleModule.name));

  beforeEach(() => {
    mocks = {
      promiseMath: dngTestUtils.nullMock(sampleModule.promiseMath)
    };

    ngMock.module(mocks);
  });

  describe('dngDefer', () => {
    // Ensuring that deprecated usage is still supported (for now).
    describe('Using as a function should still work for backwards compatibility', () => {
      let promiseToSquare;

      beforeEach(ngMock.inject(dngDefer => {
        promiseToSquare = dngDefer(mocks.promiseMath.promiseToSquare);
      }));

      it('should create a deferred which can be resolved', done => {
        mocks.promiseMath.promiseToSquare().then(x => {
          expect(x).toBe('value');
          done();
        });
        promiseToSquare.resolveAndDigest('value');
      });

      it('should create a deferred which can be rejected', done => {
        mocks.promiseMath.promiseToSquare().catch(x => {
          expect(x).toBe('error');
          done();
        });
        promiseToSquare.rejectAndDigest('error');
      });
    });

    describe('defer', () => {
      let deferred;

      beforeEach(ngMock.inject(dngDefer => {
        deferred = dngDefer.defer();
      }));

      it('should create a deferred which can be resolved', done => {
        deferred.promise.then(x => {
          expect(x).toBe('value');
          done();
        });
        deferred.resolveAndDigest('value');
      });

      it('should create a deferred which can be rejected', done => {
        deferred.promise.catch(x => {
          expect(x).toBe('error');
          done();
        });
        deferred.rejectAndDigest('error');
      });
    });

    describe('deferSpy', () => {
      let promiseToSquare;

      beforeEach(ngMock.inject(dngDefer => {
        promiseToSquare = dngDefer.deferSpy(mocks.promiseMath.promiseToSquare);
      }));

      it('should create a deferred which can be resolved', done => {
        mocks.promiseMath.promiseToSquare().then(x => {
          expect(x).toBe('value');
          done();
        });
        promiseToSquare.resolveAndDigest('value');
      });

      it('should create a deferred which can be rejected', done => {
        mocks.promiseMath.promiseToSquare().catch(x => {
          expect(x).toBe('error');
          done();
        });
        promiseToSquare.rejectAndDigest('error');
      });
    });

    describe('deferSpyWithResult', () => {
      let modalSpy;
      let modalDeferred;

      beforeEach(ngMock.inject(dngDefer => {
        modalSpy = jasmine.createSpyObj('modalSpy', ['open']);
        modalDeferred = dngDefer.deferSpyWithResult(modalSpy.open);
      }));

      it('should create a deferred under a "result" property which can be resolved', done => {
        modalSpy.open().result.then(x => {
          expect(x).toBe('value');
          done();
        });
        modalDeferred.resolveAndDigest('value');
      });

      it('should create a deferred under a "result" property which can be rejected', done => {
        modalSpy.open().result.catch(x => {
          expect(x).toBe('error');
          done();
        });
        modalDeferred.rejectAndDigest('error');
      });
    });
  });
});
