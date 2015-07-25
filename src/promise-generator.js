export default ($q, $rootScope) => {
  function wrapWithDigest(fn, val) {
    fn(val);
    $rootScope.$digest();
  }

  return (spy) => {
    const deferred = $q.defer();
    spy.and.returnValue(deferred.promise);
    return {
      resolveAndDigest: wrapWithDigest.bind(deferred, deferred.resolve),
      rejectAndDigest: wrapWithDigest.bind(deferred, deferred.reject)
    }
  }
}
