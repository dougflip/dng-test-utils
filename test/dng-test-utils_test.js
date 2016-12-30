import dngTestUtils from '../src/dng-test-utils';
import sampleModule from './test-module';

const ngMock = angular.mock;

/**
 * Example of testing a pretty simple factory style file.
 */
describe('DngTestUtils', () => {
  let sutMocks;

  /**
   * An array of dependencies you want replaced with nullMock instances.
   * No need to import the actual files anymore - just use the name registered with Angular.
   * Behind the scenes, we'll use a decorator to create the nullMock.
   */
  const nullMocks = ['promiseMath'];

  /**
   * Represents local dependencies that something like UI Router would inject
   * This should be a key/value of injectableName -> value
   * This is essentially forwarded to angular.mock.module
   */
  const customMocks = {
    customDependency: jasmine.createSpyObj('localDep', ['methodName'])
  };

  /**
   * One call sets up your module, dependencies, and mocks.
   */
  beforeEach(dngTestUtils.init(sampleModule.name, nullMocks, customMocks));

  /**
   * You probably won't need to do module stuff anymore
   * But this is here just to ensure it works in case it is needed.
   */
  beforeEach(ngMock.module($provide => {
    // just making sure this is available if needed...
  }));

  /**
   * The call to `dngTestUtils.init` creates a new injectable named `dngMocks`.
   * This will have your nullMocks and customMocks attached to it.
   * You can alias this to a local name or you could just inject with ngMock.inject
   * in the specific places where you need it.
   * We'll alias in this example.
   */
  beforeEach(ngMock.inject(dngMocks => sutMocks = dngMocks));

  describe('dngDefer', () => {
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
        promiseToSquare = dngDefer.deferSpy(sutMocks.promiseMath.promiseToSquare);
      }));

      it('should create a deferred which can be resolved', done => {
        sutMocks.promiseMath.promiseToSquare().then(x => {
          expect(x).toBe('value');
          done();
        });
        promiseToSquare.resolveAndDigest('value');
      });

      it('should create a deferred which can be rejected', done => {
        sutMocks.promiseMath.promiseToSquare().catch(x => {
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
