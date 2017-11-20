/*
 * @flow
 */

import PACKAGE from '../package.json';

import {
  REQUEST as REQUEST_ACTION_TYPE,
  SUCCESS as SUCCESS_ACTION_TYPE,
  FAILURE as FAILURE_ACTION_TYPE,
  FINALLY as FINALLY_ACTION_TYPE
} from './actionTypes';

import {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY,
  newRequestSequence,
  version
} from './index';

describe('RequestSequence library export', () => {

  test(`should export ${REQUEST_ACTION_TYPE}`, () => {
    expect(REQUEST).toEqual(REQUEST_ACTION_TYPE);
  });

  test(`should export ${SUCCESS_ACTION_TYPE}`, () => {
    expect(SUCCESS).toEqual(SUCCESS_ACTION_TYPE);
  });

  test(`should export ${FAILURE_ACTION_TYPE}`, () => {
    expect(FAILURE).toEqual(FAILURE_ACTION_TYPE);
  });

  test(`should export ${FINALLY_ACTION_TYPE}`, () => {
    expect(FINALLY).toEqual(FINALLY_ACTION_TYPE);
  });

  test('should export newRequestSequence', () => {
    expect(newRequestSequence).toBeInstanceOf(Function);
  });

  test('should export version', () => {
    expect(version).toEqual(PACKAGE.version);
  });

});
