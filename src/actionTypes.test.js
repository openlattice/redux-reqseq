/*
 * @flow
 */

import {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY,
} from './actionTypes';

const REQUEST_ACTION_TYPE :'REQUEST' = 'REQUEST';
const SUCCESS_ACTION_TYPE :'SUCCESS' = 'SUCCESS';
const FAILURE_ACTION_TYPE :'FAILURE' = 'FAILURE';
const FINALLY_ACTION_TYPE :'FINALLY' = 'FINALLY';

describe('RequestSequence Action Types', () => {

  test(`${REQUEST_ACTION_TYPE}`, () => {
    expect(REQUEST).toEqual(REQUEST_ACTION_TYPE);
  });

  test(`${SUCCESS_ACTION_TYPE}`, () => {
    expect(SUCCESS).toEqual(SUCCESS_ACTION_TYPE);
  });

  test(`${FAILURE_ACTION_TYPE}`, () => {
    expect(FAILURE).toEqual(FAILURE_ACTION_TYPE);
  });

  test(`${FINALLY_ACTION_TYPE}`, () => {
    expect(FINALLY).toEqual(FINALLY_ACTION_TYPE);
  });

});
