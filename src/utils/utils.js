/*
 * @flow
 */

const STRING_TAG :string = '[object String]';

function randomStringId() :string {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
  // not meant to be a cryptographically strong random id
  return Math.random().toString(36).slice(2) + (new Date()).getTime().toString(36);
}

function isNonEmptyString(value :any) :boolean %checks {

  return Object.prototype.toString.call(value) === STRING_TAG && value.length > 0;
}

export {
  STRING_TAG,
  isNonEmptyString,
  randomStringId,
};
