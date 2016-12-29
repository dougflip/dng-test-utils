/**
 * Simplifies working with promises an digest cycles.
 * Also provides helpers that are tailored to Jasmine spies.
 */
export default ($q, $rootScope) => {

  const wrapWithDigest = fn => {
    return val => {
      fn(val);
      $rootScope.$digest();
    };
  };

  const defer = () => {
    const deferred = $q.defer();
    return {
      promise: deferred.promise,
      resolveAndDigest: wrapWithDigest(deferred.resolve),
      rejectAndDigest: wrapWithDigest(deferred.reject)
    }
  };

  const configureSpy = (configFn) => {
    return spy => {
      const deferred = defer();
      spy.and.returnValue(configFn(deferred.promise));
      return deferred;
    }
  };

  const deferSpy = configureSpy(promise => promise);

  const deferSpyWithResult = configureSpy(promise => ({ result: promise }));

  function dngDefer(spy) {
    console.warn(
      `Using dngDefer as a function is deprecated and will be removed!
       Instead, please use the deferSpy method`
    );
    return deferSpy(spy);
  }

  dngDefer.defer = defer;
  dngDefer.deferSpy = deferSpy;
  dngDefer.deferSpyWithResult = deferSpyWithResult;

  // exporting as a function preserves backward compatibility for the time being
  // this will most likely become an object in the future though
  return dngDefer;
}
