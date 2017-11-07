module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dngNullMock = __webpack_require__(1);

	var _dngNullMock2 = _interopRequireDefault(_dngNullMock);

	var _dngDefer = __webpack_require__(2);

	var _dngDefer2 = _interopRequireDefault(_dngDefer);

	var _dngComponent = __webpack_require__(3);

	var _dngComponent2 = _interopRequireDefault(_dngComponent);

	var _dngModule = __webpack_require__(4);

	var _dngModule2 = _interopRequireDefault(_dngModule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// FIXME: Is there any way around this?
	var ng = window.angular;

	var dngTestModule = ng.module('dngTestUtils', []).factory('dngDefer', _dngDefer2.default).factory('dngComponent', _dngComponent2.default).factory('dngNullMock', function () {
	  return _dngNullMock2.default;
	});

	exports.default = {
	  name: dngTestModule.name,
	  nullMock: _dngNullMock2.default,
	  init: _dngModule2.default.init,
	  initWithKarmaTemplates: _dngModule2.default.initWithKarmaTemplates
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isFunction = window.angular.isFunction;

	function buildInstance(obj) {
	  obj = Array.isArray(obj) ? obj[obj.length - 1] : obj;
	  return obj.constructor === Function ? new obj() : obj;
	}

	function createDefaultValue(obj, key) {
	  if (isFunction(obj)) return jasmine.createSpy(key);

	  return Array.isArray(obj) ? [] : null;
	}

	/**
	 * Takes an object and returns a mock object.
	 * The mock will contain a spy for each function on the provided object.
	 * All properties (anything initialized in the provided object) will be null or []
	 * in the returned mock.
	 */

	exports.default = function (obj) {
	  var mock = {};
	  var instance = buildInstance(obj);
	  for (var key in instance) {
	    mock[key] = createDefaultValue(instance[key], key);
	  }
	  return mock;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Simplifies working with promises an digest cycles.
	 * Also provides helpers that are tailored to Jasmine spies.
	 */
	exports.default = function ($q, $rootScope) {

	  var wrapWithDigest = function wrapWithDigest(fn) {
	    return function (val) {
	      fn(val);
	      $rootScope.$digest();
	    };
	  };

	  var defer = function defer() {
	    var deferred = $q.defer();
	    return {
	      promise: deferred.promise,
	      resolveAndDigest: wrapWithDigest(deferred.resolve),
	      rejectAndDigest: wrapWithDigest(deferred.reject)
	    };
	  };

	  var configureSpy = function configureSpy(configFn) {
	    return function (spy) {
	      var deferred = defer();
	      spy.and.returnValue(configFn(deferred.promise));
	      return deferred;
	    };
	  };

	  var deferSpy = configureSpy(function (promise) {
	    return promise;
	  });

	  var deferSpyWithResult = configureSpy(function (promise) {
	    return { result: promise };
	  });

	  function dngDefer(spy) {
	    console.warn('Using dngDefer as a function is deprecated please use dngDefer.deferSpy instead.');
	    return deferSpy(spy);
	  }

	  dngDefer.defer = defer;
	  dngDefer.deferSpy = deferSpy;
	  dngDefer.deferSpyWithResult = deferSpyWithResult;

	  // exporting as a function preserves backward compatibility for the time being
	  // this will most likely become an object in the future though
	  return dngDefer;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var angular = window.angular;

	exports.default = function ($rootScope, $compile) {
	  function digest(fn) {
	    fn();
	    $rootScope.$digest();
	  }

	  function createScope() {
	    var bindings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    var scope = $rootScope.$new();
	    return angular.extend(scope, bindings);
	  }

	  function createWithScope(markup, scope) {
	    var $el = $compile(angular.element(markup))(scope);
	    $rootScope.$digest();
	    var isolateScope = $el.isolateScope();
	    return { $el: $el, scope: scope, isolateScope: isolateScope };
	  }

	  function createWithBindings(markup, bindings) {
	    return createWithScope(markup, createScope(bindings));
	  }

	  function create(markup) {
	    return createWithScope(markup, createScope());
	  }

	  return {
	    digest: digest,
	    createScope: createScope,
	    createWithScope: createWithScope,
	    createWithBindings: createWithBindings,
	    create: create
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * This will eventually just become the dng-test-utils file I think.
	 * I need to consider backwards compatibility, but this will be the way to
	 *  set up a test moving forward.
	 */
	var angular = window.angular;
	var ngMock = window.angular.mock;

	/**
	 * Creates a single injectable object `dngMocks` which will contain ALL your null mocks.
	 * This is helpful to alias to a local variable inside your test file so that
	 * you can easily get access to sutMocks:
	 *    `beforeEach(ngMock.inject(dngMocks => sutMocks = dngMocks));`
	 * Now in your tests you can do something like:
	 *    `promiseToSquare = dngDefer(sutMocks.promiseMath.promiseToSquare);`
	 * without the need to inject `dngMocks` everywhere.
	 */
	var createDngMocks = function createDngMocks(nullMocks, customMocks) {
	  return function ($injector) {
	    return angular.extend({}, customMocks, nullMocks.reduce(function (acc, x) {
	      return angular.extend(_defineProperty({}, x, $injector.get(x)), acc);
	    }, {}));
	  };
	};

	/**
	 * Registers a module with Angular and includes the provided module you are
	 * testing as a dependency.
	 * This allows us to accomplish nullmock magic via decorators.
	 *
	 * NOTE: You should use this OR register dngTestUtils by hand.
	 */
	var createTestModule = function createTestModule(deps) {
	  var nullMocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var customMocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  return angular.module('dngTestUtils.module', deps.concat('dngTestUtils')).factory('dngMocks', createDngMocks(nullMocks, customMocks));
	};

	/**
	 * This function puts it all together.
	 * It will register the module, set up the decorators, and register with ng-mocks.
	 */
	var registerAll = function registerAll(deps, nullMocks) {
	  var customMocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var testMod = createTestModule(deps, nullMocks, customMocks);

	  // use decorators to wrap requested dependencies with nullMock
	  nullMocks.forEach(function (x) {
	    return testMod.decorator(x, function ($delegate, dngNullMock) {
	      return dngNullMock($delegate);
	    });
	  });

	  // register the module with ngMock
	  ngMock.module(testMod.name);

	  // register customMocks (those that aren't nullMocked but need to exist)
	  ngMock.module(customMocks);
	};

	/**
	 * Convenience wrapper over `register` to return it as a function.
	 * This is nice when using in `beforeEach` calls that expect a function.
	 */
	var initAll = function initAll(deps) {
	  var nullMocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var customMocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  return function () {
	    return registerAll(deps, nullMocks, customMocks);
	  };
	};

	var init = function init(moduleUnderTestName) {
	  var nullMocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var customMocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  return initAll([moduleUnderTestName], nullMocks, customMocks);
	};

	var initWithKarmaTemplates = function initWithKarmaTemplates(moduleUnderTestName) {
	  var nullMocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var customMocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  return initAll([moduleUnderTestName, 'karmaTemplates'], nullMocks, customMocks);
	};

	exports.default = {
	  initAll: initAll,
	  init: init,
	  initWithKarmaTemplates: initWithKarmaTemplates
	};

/***/ }
/******/ ]);