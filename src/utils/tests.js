/*
 * @flow
 */

import { INVALID_PARAMS_NOT_DEFINED_ALLOWED } from './invalid';

function testShouldInvokeCorrectSubReducer(
  sequenceReducer :SequenceReducer,
  state :Object,
  action :Object,
  subReducerType :string
) {

  test('should invoke the correct sub-reducer', () => {
    const requestReducer = jest.fn();
    sequenceReducer(state, action, { [subReducerType]: requestReducer });
    expect(requestReducer).toHaveBeenCalledTimes(1);
  });
}

function testShouldThrowOnInvalidSubReducer(
  sequenceReducer :SequenceReducer,
  state :Object,
  action :Object,
  subReducerType :string
) {

  test('should throw if the sub-reducer is defined but not a function', () => {
    INVALID_PARAMS_NOT_DEFINED_ALLOWED.forEach((invalid :any) => {
      expect(() => sequenceReducer(state, action, { [subReducerType]: invalid })).toThrow();
    });
  });
}

export {
  testShouldInvokeCorrectSubReducer,
  testShouldThrowOnInvalidSubReducer
};
