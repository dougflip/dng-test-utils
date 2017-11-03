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
    return $el;
  }

  function createWithBindings(markup, bindings) {
    const scope = createScope(bindings);
    const $el = createWithScope(markup, scope);
    return { $el, scope };
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
