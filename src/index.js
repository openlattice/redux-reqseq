/*
 * @flow
 */

import newRequestSequence from './newRequestSequence';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY
} from './actionTypes';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY,
  newRequestSequence,
  version
};

export default {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY,
  newRequestSequence,
  version
};
