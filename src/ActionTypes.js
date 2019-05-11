/*
 * @flow
 */

const REQUEST :'REQUEST' = 'REQUEST';
const SUCCESS :'SUCCESS' = 'SUCCESS';
const FAILURE :'FAILURE' = 'FAILURE';
const FINALLY :'FINALLY' = 'FINALLY';

type SequenceActionType =
  | typeof REQUEST
  | typeof SUCCESS
  | typeof FAILURE
  | typeof FINALLY;

export {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY,
};

export type {
  SequenceActionType,
};
