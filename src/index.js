/*
 * @flow
 */

import RequestStates from './RequestStates';
import newRequestSequence from './newRequestSequence';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  RequestStates,
  newRequestSequence,
  version
};

export default {
  RequestStates,
  newRequestSequence,
  version
};
