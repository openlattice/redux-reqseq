/*
 * @flow
 */

import getSequenceAction from './getSequenceAction';

describe('getSequenceAction', () => {

  test('should be a function', () => {
    expect(getSequenceAction).toBeInstanceOf(Function);
  });

  test('invocation should return an action object', () => {
    const action = getSequenceAction({ foo: 'bar' }, '123', 'test');
    expect(action.data).toEqual({ foo: 'bar' });
    expect(action.id).toEqual('123');
    expect(action.type).toEqual('test');
  });

});
