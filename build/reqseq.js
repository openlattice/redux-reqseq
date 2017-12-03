/*!
 * 
 * redux-reqseq - v0.1.0
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
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STRING_TAG = '[object String]';

function randomId() {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // not meant to be a cryptographically strong random id
  return Math.random().toString(36).slice(2);
}

exports.STRING_TAG = STRING_TAG;
exports.randomId = randomId;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.newRequestSequence = exports.FINALLY = exports.FAILURE = exports.SUCCESS = exports.REQUEST = undefined;

var _newRequestSequence = __webpack_require__(4);

var _newRequestSequence2 = _interopRequireDefault(_newRequestSequence);

var _actionTypes = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// injected by Webpack.DefinePlugin
var version = "v0.1.0";

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = newRequestSequence;

var _getSequenceAction = __webpack_require__(5);

var _getSequenceAction2 = _interopRequireDefault(_getSequenceAction);

var _getSequenceReducer = __webpack_require__(6);

var _getSequenceReducer2 = _interopRequireDefault(_getSequenceReducer);

var _getSwitchCaseMatcher = __webpack_require__(7);

var _getSwitchCaseMatcher2 = _interopRequireDefault(_getSwitchCaseMatcher);

var _actionTypes = __webpack_require__(0);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * TODO: need logger
 */

function isValidId(value) {

  return Object.prototype.toString.call(value) === _utils.STRING_TAG && value.length > 0;
}

function newRequestSequence(baseType) {

  var requestSequenceActionType = (baseType + '/' + _actionTypes.REQUEST).toUpperCase();
  var successSequenceActionType = (baseType + '/' + _actionTypes.SUCCESS).toUpperCase();
  var failureSequenceActionType = (baseType + '/' + _actionTypes.FAILURE).toUpperCase();
  var finallySequenceActionType = (baseType + '/' + _actionTypes.FINALLY).toUpperCase();

  var sequences = {};

  var triggerActionCreator = function triggerActionCreator(triggerValue) {
    var id = (0, _utils.randomId)();
    sequences[id] = {
      requestCalled: false,
      successCalled: false,
      failureCalled: false,
      request: function request(requestValue) {
        return (0, _getSequenceAction2.default)(id, requestSequenceActionType, requestValue);
      },
      success: function success(successValue) {
        return (0, _getSequenceAction2.default)(id, successSequenceActionType, successValue);
      },
      failure: function failure(failureValue) {
        return (0, _getSequenceAction2.default)(id, failureSequenceActionType, failureValue);
      },
      finally: function _finally(finallyValue) {
        return (0, _getSequenceAction2.default)(id, finallySequenceActionType, finallyValue);
      }
    };
    return (0, _getSequenceAction2.default)(id, baseType, triggerValue);
  };

  var requestActionCreator = function requestActionCreator(id, value) {
    if (!isValidId(id) || !sequences[id]) {
      throw new Error('request() has been called with an invalid id');
    }
    if (sequences[id].requestCalled === true) {
      throw new Error('request() has already been called');
    }
    sequences[id].requestCalled = true;
    return sequences[id].request(value);
  };

  var successActionCreator = function successActionCreator(id, value) {
    if (!isValidId(id) || !sequences[id]) {
      throw new Error('success() has been called with an invalid id');
    }
    if (sequences[id].successCalled === true) {
      throw new Error('success() has already been called');
    }
    sequences[id].successCalled = true;
    return sequences[id].success(value);
  };

  var failureActionCreator = function failureActionCreator(id, value) {
    if (!isValidId(id) || !sequences[id]) {
      throw new Error('failure() has been called with an invalid id');
    }
    if (sequences[id].failureCalled === true) {
      throw new Error('failure() has already been called');
    }
    sequences[id].failureCalled = true;
    return sequences[id].failure(value);
  };

  var finallyActionCreator = function finallyActionCreator(id, value) {
    if (!isValidId(id) || !sequences[id]) {
      throw new Error('finally() has been called with an invalid id');
    }
    var sequence = sequences[id];
    delete sequences[id];
    return sequence.finally(value);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSequenceAction;
function getSequenceAction(id, type, value) {

  if (value === null || value === undefined) {
    return {
      id: id,
      type: type
    };
  }

  return {
    id: id,
    type: type,
    value: value
  };
}

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSwitchCaseMatcher;

var _utils = __webpack_require__(1);

function isValidType(value) {

  return Object.prototype.toString.call(value) === _utils.STRING_TAG && value.length > 0;
}

function getSwitchCaseMatcher(baseType, actionCreator) {

  return function (switchType) {

    if (!isValidType(switchType)) {
      return baseType;
    }

    var subType = '';
    var slashIndex = switchType.lastIndexOf('/');
    if (slashIndex > 0 && slashIndex < switchType.length) {
      subType = switchType.substring(slashIndex + 1);
    }

    return actionCreator[subType] === baseType + '/' + subType ? switchType : baseType;
  };
}

/***/ })
/******/ ]);
});