import { Map } from 'immutable';

import RequestStates from './RequestStates';
import { testEnumIntegrity } from './utils/tests';

/* eslint-disable key-spacing */
const EXPECTED_ENUM = Map({
  STANDBY: 'STANDBY',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
});
/* eslint-enable */

describe('RequestStates', () => {

  testEnumIntegrity(RequestStates, EXPECTED_ENUM);

});
