/*
 * @flow
 */

import getSwitchCaseMatcher from './getSwitchCaseMatcher';
import { INVALID_SS_PARAMS } from './utils/invalid';
import { randomStringId } from './utils/utils';

function getMockActionCreator() {
  return () => ({
    id: randomStringId(),
    type: '__TEST__',
    value: {
      id: randomStringId()
    }
  });
}

describe('getSwitchCaseMatcher', () => {

  test('should be a function', () => {
    expect(getSwitchCaseMatcher).toBeInstanceOf(Function);
  });

  test('invocation should return a function', () => {
    expect(getSwitchCaseMatcher(randomStringId(), getMockActionCreator())).toBeInstanceOf(Function);
  });

  test('should return the given base action type for invalid switch types', () => {
    INVALID_SS_PARAMS.forEach((invalid :any) => {
      const baseType = randomStringId();
      const matcher = getSwitchCaseMatcher(baseType, getMockActionCreator());
      expect(matcher(invalid)).toEqual(baseType);
      expect(matcher(`${baseType}/${invalid}`)).toEqual(baseType);
    });
  });

  test('should return the given switch type if it matches', () => {

    const baseType = randomStringId();
    const subType = randomStringId();
    const switchType = `${baseType}/${subType}`;

    const mockActionCreator = getMockActionCreator();
    mockActionCreator[subType] = switchType;

    const matcher = getSwitchCaseMatcher(baseType, mockActionCreator);
    expect(matcher(switchType)).toEqual(switchType);
    expect(matcher(`__TEST__/${subType}`)).toEqual(baseType);
    expect(matcher(`${baseType}/__TEST__`)).toEqual(baseType);
  });

});
