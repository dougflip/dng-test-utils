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

	var _diMock = __webpack_require__(1);

	var _diMock2 = _interopRequireDefault(_diMock);

	var _nullmock = __webpack_require__(2);

	var _nullmock2 = _interopRequireDefault(_nullmock);

	var _promiseGenerator = __webpack_require__(3);

	var _promiseGenerator2 = _interopRequireDefault(_promiseGenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// FIXME: Is there any way around this?
	var ng = window.angular;

	var dngTestModule = ng.module('dngTestUtils', []).factory('dngDefer', _promiseGenerator2.default).factory('dngNullMock', function () {
	  return _nullmock2.default;
	});

	exports.default = {
	  name: dngTestModule.name,
	  registerMocks: _diMock2.default,
	  nullMock: _nullmock2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (mocks) {
	  return function ($provide) {
	    for (var prop in mocks) {
	      $provide.value(prop, mocks[prop]);
	    }
	  };
	};

/***/ },
/* 2 */
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

	exports.default = function (obj) {
	    var mock = {};
	    var instance = buildInstance(obj);
	    for (var key in instance) {
	        mock[key] = createDefaultValue(instance[key], key);
	    }
	    return mock;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function ($q, $rootScope) {
	  function wrapWithDigest(fn, val) {
	    fn(val);
	    $rootScope.$digest();
	  }

	  return function (spy) {
	    var deferred = $q.defer();
	    spy.and.returnValue(deferred.promise);
	    return {
	      resolveAndDigest: wrapWithDigest.bind(deferred, deferred.resolve),
	      rejectAndDigest: wrapWithDigest.bind(deferred, deferred.reject)
	    };
	  };
	};

/***/ }
/******/ ]);