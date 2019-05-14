/*
 * @flow
 */

type RequestStates = {|
  STANDBY :'STANDBY';
  PENDING :'PENDING';
  SUCCESS :'SUCCESS';
  FAILURE :'FAILURE';
|};
type RequestState = $Values<RequestStates>;

const RequestStatesEnum :RequestStates = Object.freeze({
  STANDBY: 'STANDBY',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
});

// NOTE: we are deliberately exporting the enum using the spread operator
export default {
  ...RequestStatesEnum
};

export type {
  RequestState,
  RequestStates,
};
