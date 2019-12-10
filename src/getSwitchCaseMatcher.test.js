/*
 * @flow
 */

import getSwitchCaseMatcher from './getSwitchCaseMatcher';
import { INVALID_SS_PARAMS } from './utils/invalid';
import { randomStringId } from './utils/utils';

const MOCK_ACTION = 'MOCK_ACTION';
const MOCK_ACTION_TYPES = {
  REQUEST: `${MOCK_ACTION}/REQUEST`,
  SUCCESS: `${MOCK_ACTION}/SUCCESS`,
  FAILURE: `${MOCK_ACTION}/FAILURE`,
  FINALLY: `${MOCK_ACTION}/FINALLY`,
};

describe('getSwitchCaseMatcher', () => {

  test('should be a function', () => {
    expect(getSwitchCaseMatcher).toBeInstanceOf(Function);
  });

  test('invocation should return a function', () => {
    expect(getSwitchCaseMatcher(randomStringId(), MOCK_ACTION_TYPES)).toBeInstanceOf(Function);
  });

  test('should return the given base action type for invalid switch types', () => {
    INVALID_SS_PARAMS.forEach((invalid :any) => {
      const baseType = randomStringId();
      const matcher = getSwitchCaseMatcher(baseType, MOCK_ACTION_TYPES);
      expect(matcher(invalid)).toEqual(baseType);
      expect(matcher(`${baseType}/${invalid}`)).toEqual(baseType);
    });
  });

  test('should return the given switch type if it matches', () => {

    const baseType = randomStringId();
    const subType = randomStringId();
    const switchType = `${baseType}/${subType}`;

    const mockActionTypes = { ...MOCK_ACTION_TYPES };
    mockActionTypes[subType] = switchType;

    const matcher = getSwitchCaseMatcher(baseType, mockActionTypes);
    expect(matcher(switchType)).toEqual(switchType);
    expect(matcher(`__TEST__/${subType}`)).toEqual(baseType);
    expect(matcher(`${baseType}/__TEST__`)).toEqual(baseType);
  });

});
