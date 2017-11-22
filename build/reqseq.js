/*!
 * 
 * redux-reqseq - v0.0.2
 * 
 * https://github.com/openlattice/redux-reqseq
 * 
 * Copyright (c) 2014-2016, OpenLattice, Inc. All rights reserved.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReqSeq"] = factory();
	else
		root["ReqSeq"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var REQUEST = 'REQUEST';
var SUCCESS = 'SUCCESS';
var FAILURE = 'FAILURE';
var FINALLY = 'FINALLY';

exports.REQUEST = REQUEST;
exports.SUCCESS = SUCCESS;
exports.FAILURE = FAILURE;
exports.FINALLY = FINALLY;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.newRequestSequence = exports.FINALLY = exports.FAILURE = exports.SUCCESS = exports.REQUEST = undefined;

var _newRequestSequence = __webpack_require__(3);

var _newRequestSequence2 = _interopRequireDefault(_newRequestSequence);

var _actionTypes = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// injected by Webpack.DefinePlugin
var version = "v0.0.2";

exports.REQUEST = _actionTypes.REQUEST;
exports.SUCCESS = _actionTypes.SUCCESS;
exports.FAILURE = _actionTypes.FAILURE;
exports.FINALLY = _actionTypes.FINALLY;
exports.newRequestSequence = _newRequestSequence2.default;
exports.version = version;
exports.default = {
  REQUEST: _actionTypes.REQUEST,
  SUCCESS: _actionTypes.SUCCESS,
  FAILURE: _actionTypes.FAILURE,
  FINALLY: _actionTypes.FINALLY,
  newRequestSequence: _newRequestSequence2.default,
  version: version
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = newRequestSequence;

var _getSequenceAction = __webpack_require__(4);

var _getSequenceAction2 = _interopRequireDefault(_getSequenceAction);

var _getSequenceReducer = __webpack_require__(5);

var _getSequenceReducer2 = _interopRequireDefault(_getSequenceReducer);

var _getSwitchCaseMatcher = __webpack_require__(6);

var _getSwitchCaseMatcher2 = _interopRequireDefault(_getSwitchCaseMatcher);

var _actionTypes = __webpack_require__(0);

var _utils = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function newRequestSequence(baseType) {

  var requestSequenceActionType = (baseType + '/' + _actionTypes.REQUEST).toUpperCase();
  var successSequenceActionType = (baseType + '/' + _actionTypes.SUCCESS).toUpperCase();
  var failureSequenceActionType = (baseType + '/' + _actionTypes.FAILURE).toUpperCase();
  var finallySequenceActionType = (baseType + '/' + _actionTypes.FINALLY).toUpperCase();

  var triggerCallCount = 0;
  var requestCallCount = 0;
  var successCallCount = 0;
  var failureCallCount = 0;
  var finallyCallCount = 0;

  var sequenceIds = {};

  var triggerActionCreator = function triggerActionCreator(data) {
    triggerCallCount += 1;
    sequenceIds[triggerCallCount] = (0, _utils.randomId)();
    return (0, _getSequenceAction2.default)(data, sequenceIds[triggerCallCount], baseType);
  };

  var requestActionCreator = function requestActionCreator(data) {
    if (requestCallCount + 1 === triggerCallCount) {
      requestCallCount += 1;
    }
    return (0, _getSequenceAction2.default)(data, sequenceIds[requestCallCount], requestSequenceActionType);
  };

  var successActionCreator = function successActionCreator(data) {
    if (successCallCount + 1 === triggerCallCount) {
      successCallCount += 1;
    }
    return (0, _getSequenceAction2.default)(data, sequenceIds[successCallCount], successSequenceActionType);
  };

  var failureActionCreator = function failureActionCreator(data) {
    if (failureCallCount + 1 === triggerCallCount) {
      failureCallCount += 1;
    }
    return (0, _getSequenceAction2.default)(data, sequenceIds[failureCallCount], failureSequenceActionType);
  };

  var finallyActionCreator = function finallyActionCreator(data) {
    if (finallyCallCount + 1 === triggerCallCount) {
      finallyCallCount += 1;
    }
    return (0, _getSequenceAction2.default)(data, sequenceIds[finallyCallCount], finallySequenceActionType);
  };

  triggerActionCreator.REQUEST = requestSequenceActionType;
  triggerActionCreator.SUCCESS = successSequenceActionType;
  triggerActionCreator.FAILURE = failureSequenceActionType;
  triggerActionCreator.FINALLY = finallySequenceActionType;

  triggerActionCreator.request = requestActionCreator;
  triggerActionCreator.success = successActionCreator;
  triggerActionCreator.failure = failureActionCreator;
  triggerActionCreator.finally = finallyActionCreator;

  triggerActionCreator.case = (0, _getSwitchCaseMatcher2.default)(baseType, triggerActionCreator);
  triggerActionCreator.reducer = (0, _getSequenceReducer2.default)(baseType);

  // as of v0.57, FLow doesn't support this use case: https://github.com/facebook/flow/issues/5224
  // workaround: typecast to less the specific "any" type
  return triggerActionCreator;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getSequenceAction;
function getSequenceAction(data, id, type) {

  return {
    id: id,
    type: type,
    data: _extends({}, data)
  };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSequenceReducer;

var _actionTypes = __webpack_require__(0);

function getSequenceReducer(baseType) {

  return function (state, action, subReducers) {

    if (action.type === baseType + '/' + _actionTypes.REQUEST) {
      var requestReducer = subReducers[_actionTypes.REQUEST];
      if (requestReducer !== null && requestReducer !== undefined) {
        if (typeof requestReducer === 'function') {
          return requestReducer();
        }
        throw new Error('RequestSequence: ' + _actionTypes.REQUEST + ' reducer must be a function.');
      }
    } else if (action.type === baseType + '/' + _actionTypes.SUCCESS) {
      var successReducer = subReducers[_actionTypes.SUCCESS];
      if (successReducer !== null && successReducer !== undefined) {
        if (typeof successReducer === 'function') {
          return successReducer();
        }
        throw new Error('RequestSequence: ' + _actionTypes.SUCCESS + ' reducer must be a function.');
      }
    } else if (action.type === baseType + '/' + _actionTypes.FAILURE) {
      var failureReducer = subReducers[_actionTypes.FAILURE];
      if (failureReducer !== null && failureReducer !== undefined) {
        if (typeof failureReducer === 'function') {
          return failureReducer();
        }
        throw new Error('RequestSequence: ' + _actionTypes.FAILURE + ' reducer must be a function.');
      }
    } else if (action.type === baseType + '/' + _actionTypes.FINALLY) {
      var finallyReducer = subReducers[_actionTypes.FINALLY];
      if (finallyReducer !== null && finallyReducer !== undefined) {
        if (typeof finallyReducer === 'function') {
          return finallyReducer();
        }
        throw new Error('RequestSequence: ' + _actionTypes.FINALLY + ' reducer must be a function.');
      }
    }

    return state;
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSwitchCaseMatcher;
function getSwitchCaseMatcher(baseType, actionCreator) {

  return function (switchType) {

    var parsed = '';
    var slashIndex = switchType.lastIndexOf('/');
    if (slashIndex > 0 && slashIndex < switchType.length) {
      parsed = switchType.substring(slashIndex + 1);
    }

    return actionCreator[parsed] === switchType ? switchType : baseType;
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


/* eslint-disable import/prefer-default-export */

function randomId() {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // not meant to be a cryptographically strong random id
  return Math.random().toString(36).slice(2);
}

exports.randomId = randomId;

/***/ })
/******/ ]);
});