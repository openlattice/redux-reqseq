/*
 * @flow
 */

type RequestStateEnum = {|
  STANDBY :'STANDBY';
  PENDING :'PENDING';
  SUCCESS :'SUCCESS';
  FAILURE :'FAILURE';
|};
type RequestState = $Values<RequestStateEnum>;

const RequestStates :RequestStateEnum = Object.freeze({
  STANDBY: 'STANDBY',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
});

export default RequestStates;
export type {
  RequestState,
  RequestStateEnum,
};
