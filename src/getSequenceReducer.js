/*
 * @flow
 */

import {
  FAILURE,
  FINALLY,
  REQUEST,
  SUCCESS,
} from './ActionTypes';

type SubReducers = {
  REQUEST ?:() => any;
  SUCCESS ?:() => any;
  FAILURE ?:() => any;
  FINALLY ?:() => any;
};

type Action = {
  type :string;
};
type ActionType = string;
type ActionOrActionType = Action | ActionType;

type SequenceReducer = (state :any, action :ActionOrActionType, subReducers :SubReducers) => any;

export default function getSequenceReducer(baseType :string) :SequenceReducer {

  // "actionOrActionType" is for backwards compatibility
  return (state :any, actionOrActionType :ActionOrActionType, subReducers :SubReducers) :any => {

    let actionType :string = '';
    if (typeof actionOrActionType === 'string') {
      actionType = actionOrActionType;
    }
    else if (typeof actionOrActionType.type === 'string') {
      actionType = actionOrActionType.type;
    }

    if (actionType === `${baseType}/${REQUEST}`) {
      const requestReducer = subReducers[REQUEST];
      if (requestReducer !== null && requestReducer !== undefined) {
        if (typeof requestReducer === 'function') {
          return requestReducer();
        }
        throw new Error(`RequestSequence: ${REQUEST} reducer must be a function.`);
      }
    }
    else if (actionType === `${baseType}/${SUCCESS}`) {
      const successReducer = subReducers[SUCCESS];
      if (successReducer !== null && successReducer !== undefined) {
        if (typeof successReducer === 'function') {
          return successReducer();
        }
        throw new Error(`RequestSequence: ${SUCCESS} reducer must be a function.`);
      }
    }
    else if (actionType === `${baseType}/${FAILURE}`) {
      const failureReducer = subReducers[FAILURE];
      if (failureReducer !== null && failureReducer !== undefined) {
        if (typeof failureReducer === 'function') {
          return failureReducer();
        }
        throw new Error(`RequestSequence: ${FAILURE} reducer must be a function.`);
      }
    }
    else if (actionType === `${baseType}/${FINALLY}`) {
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
