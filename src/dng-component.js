const angular = window.angular;

export default ($rootScope, $compile) => {
  function digest(fn) {
    fn();
    $rootScope.$digest();
  }

  function createScope(bindings = {}) {
    const scope = $rootScope.$new();
    return angular.extend(scope, bindings);
  }

  function createWithScope(markup, scope) {
    const $el = $compile(angular.element(markup))(scope);
    $rootScope.$digest();
    const isolateScope = $el.isolateScope();
    return { $el, scope, isolateScope };
  }

  function createWithBindings(markup, bindings) {
    return createWithScope(markup, createScope(bindings));
  }

  function create(markup) {
    return createWithScope(markup, createScope());
  }

  return {
    digest,
    createScope,
    createWithScope,
    createWithBindings,
    create,
  };
};
