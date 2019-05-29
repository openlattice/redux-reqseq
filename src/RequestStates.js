/*
 * @flow
 */

type RequestStatesEnum = {|
  STANDBY :'STANDBY';
  PENDING :'PENDING';
  SUCCESS :'SUCCESS';
  FAILURE :'FAILURE';
|};
type RequestState = $Values<RequestStatesEnum>;

const RequestStates :{| ...RequestStatesEnum |} = Object.freeze({
  STANDBY: 'STANDBY',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
});

export default RequestStates;
export type { RequestState };
