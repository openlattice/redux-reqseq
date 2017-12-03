/* eslint-disable no-array-constructor, no-new-object, no-new-wrappers, no-multi-spaces */
const INVALID_PARAMS = [
  undefined,          // 0
  null,               // 1
  [],                 // 2
  new Array(),        // 3
  {},                 // 4
  new Object(),       // 5
  true,               // 6
  false,              // 7
  new Boolean(true),  // 8
  new Boolean(false), // 9
  -1,                 // 10
  0,                  // 11
  1,                  // 12
  '',                 // 13
  ' ',                // 14
  new String(),       // 15
  /regex/             // 16
];
/* eslint-enable */

const INVALID_PARAMS_NOT_DEFINED_ALLOWED = INVALID_PARAMS.slice(0);
INVALID_PARAMS_NOT_DEFINED_ALLOWED.splice(1, 1); // remove "null"
INVALID_PARAMS_NOT_DEFINED_ALLOWED.splice(0, 1); // remove "undefined"

// SS = special string, for cases where strings have to be of a specific format/value, such as UUIDs and Enums
const INVALID_SS_PARAMS = INVALID_PARAMS.slice(0);
INVALID_SS_PARAMS.push('invalid_special_string_value');

export {
  INVALID_PARAMS,
  INVALID_PARAMS_NOT_DEFINED_ALLOWED,
  INVALID_SS_PARAMS
};
