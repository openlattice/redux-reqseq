/*
 * @flow
 */

import getSwitchCaseMatcher from './getSwitchCaseMatcher';

const MOCK_ACTION_CREATOR = () => {
  return {
    data: {},
    id: '',
    type: ''
  };
};

describe('getSwitchCaseMatcher', () => {

  test('should be a function', () => {
    expect(getSwitchCaseMatcher).toBeInstanceOf(Function);
  });

  test('invocation should return a function', () => {
    expect(getSwitchCaseMatcher('baseType', MOCK_ACTION_CREATOR)).toBeInstanceOf(Function);
  });

});
