/*
 * @flow
 */

import { INVALID_PARAMS_NOT_DEFINED_ALLOWED } from './invalid';

function testEnumIntegrity(enumToTest :Object, expectedEnum :Object) {

  test('should contain only expected enum values', () => {
    expect(Object.keys(enumToTest)).toEqual(Object.values(enumToTest));
    expect(Object.keys(enumToTest)).toEqual(expectedEnum.keySeq().toJS());
    expect(Object.values(enumToTest)).toEqual(expectedEnum.valueSeq().toJS());
  });

  expectedEnum.forEach((value) => {
    test(`should contain "${value}"`, () => {
      expect(enumToTest).toHaveProperty(value);
      expect(enumToTest[value]).toEqual(value);
    });
  });
}

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
  testEnumIntegrity,
  testShouldInvokeCorrectSubReducer,
  testShouldThrowOnInvalidSubReducer
};
