/*
 * @flow
 */

import RequestStates from './RequestStates';
import newRequestSequence from './newRequestSequence';

import type { RequestState } from './RequestStates';
import type { SequenceAction } from './getSequenceAction';
import type { RequestSequence } from './newRequestSequence';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  RequestStates,
  newRequestSequence,
  version,
};

export default {
  RequestStates,
  newRequestSequence,
  version,
};

export type {
  RequestSequence,
  RequestState,
  SequenceAction,
};
