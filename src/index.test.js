/*
 * @flow
 */

import PACKAGE from '../package.json';
import InternalRequestStates from './RequestStates';

import {
  RequestStates,
  newRequestSequence,
  version
} from './index';

describe('redux-reqseq library export', () => {

  test('should export RequestStates', () => {
    expect(RequestStates).toEqual(InternalRequestStates);
  });

  test('should export newRequestSequence', () => {
    expect(newRequestSequence).toBeInstanceOf(Function);
  });

  test('should export version', () => {
    expect(version).toEqual(PACKAGE.version);
  });

});
