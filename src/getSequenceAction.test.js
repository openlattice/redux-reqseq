/*
 * @flow
 */

import getSequenceAction from './getSequenceAction';

describe('getSequenceAction', () => {

  test('should be a function', () => {
    expect(getSequenceAction).toBeInstanceOf(Function);
  });

  test('should return an action object', () => {
    const action = getSequenceAction('123', 'test', { foo: 'bar' });
    expect(action.id).toEqual('123');
    expect(action.type).toEqual('test');
    expect(action.value).toEqual({ foo: 'bar' });
  });

  test('should return an action object with "value" = {} property when the given value is null or undefined', () => {

    let action = getSequenceAction('123', 'test');
    expect(action.id).toEqual('123');
    expect(action.type).toEqual('test');
    expect(action.value).toEqual({});

    action = getSequenceAction('123', 'test', null);
    expect(action.id).toEqual('123');
    expect(action.type).toEqual('test');
    expect(action.value).toEqual({});

    action = getSequenceAction('123', 'test', undefined);
    expect(action.id).toEqual('123');
    expect(action.type).toEqual('test');
    expect(action.value).toEqual({});
  });

});
