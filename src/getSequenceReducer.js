/*
 * @flow
 */

import {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY
} from './ActionTypes';
import type { SequenceAction } from './getSequenceAction';

type SubReducers = {
  REQUEST ?:() => any;
  SUCCESS ?:() => any;
  FAILURE ?:() => any;
  FINALLY ?:() => any;
};

type SequenceReducer = (state :any, action :SequenceAction, subReducers :SubReducers) => any;

export default function getSequenceReducer(baseType :string) :SequenceReducer {

  return (state :any, action :SequenceAction, subReducers :SubReducers) :any => {

    if (action.type === `${baseType}/${REQUEST}`) {
      const requestReducer = subReducers[REQUEST];
      if (requestReducer !== null && requestReducer !== undefined) {
        if (typeof requestReducer === 'function') {
          return requestReducer();
        }
        throw new Error(`RequestSequence: ${REQUEST} reducer must be a function.`);
      }
    }
    else if (action.type === `${baseType}/${SUCCESS}`) {
      const successReducer = subReducers[SUCCESS];
      if (successReducer !== null && successReducer !== undefined) {
        if (typeof successReducer === 'function') {
          return successReducer();
        }
        throw new Error(`RequestSequence: ${SUCCESS} reducer must be a function.`);
      }
    }
    else if (action.type === `${baseType}/${FAILURE}`) {
      const failureReducer = subReducers[FAILURE];
      if (failureReducer !== null && failureReducer !== undefined) {
        if (typeof failureReducer === 'function') {
          return failureReducer();
        }
        throw new Error(`RequestSequence: ${FAILURE} reducer must be a function.`);
      }
    }
    else if (action.type === `${baseType}/${FINALLY}`) {
      const finallyReducer = subReducers[FINALLY];
      if (finallyReducer !== null && finallyReducer !== undefined) {
        if (typeof finallyReducer === 'function') {
          return finallyReducer();
        }
        throw new Error(`RequestSequence: ${FINALLY} reducer must be a function.`);
      }
    }

    return state;
  };
}

export type {
  SequenceReducer,
  SubReducers,
};
