/*
 * @flow
 */

import getSequenceReducer from './getSequenceReducer';

describe('getSequenceReducer', () => {

  test('should be a function', () => {
    expect(getSequenceReducer).toBeInstanceOf(Function);
  });

  test('invocation should return a function', () => {
    expect(getSequenceReducer('baseType')).toBeInstanceOf(Function);
  });

});
