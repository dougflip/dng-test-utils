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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dngNullMock = __webpack_require__(1);

	var _dngNullMock2 = _interopRequireDefault(_dngNullMock);

	var _dngDefer = __webpack_require__(2);

	var _dngDefer2 = _interopRequireDefault(_dngDefer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// FIXME: Is there any way around this?
	var ng = window.angular;

	var dngTestModule = ng.module('dngTestUtils', []).factory('dngDefer', _dngDefer2.default).factory('dngNullMock', function () {
	  return _dngNullMock2.default;
	});

	exports.default = {
	  name: dngTestModule.name,
	  nullMock: _dngNullMock2.default
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

	"use strict";

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
	    console.warn("Using dngDefer as a function is deprecated and will be removed!\n       Instead, please use the deferSpy method");
	    return deferSpy(spy);
	  }

	  dngDefer.defer = defer;
	  dngDefer.deferSpy = deferSpy;
	  dngDefer.deferSpyWithResult = deferSpyWithResult;

	  // exporting as a function preserves backward compatibility for the time being
	  // this will most likely become an object in the future though
	  return dngDefer;
	};

/***/ }
/******/ ]);