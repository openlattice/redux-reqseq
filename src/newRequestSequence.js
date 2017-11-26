/*
 * @flow
 */

import getSequenceAction from './getSequenceAction';
import getSequenceReducer from './getSequenceReducer';
import getSwitchCaseMatcher from './getSwitchCaseMatcher';
import { REQUEST, SUCCESS, FAILURE, FINALLY } from './actionTypes';
import { randomId } from './utils';

export default function newRequestSequence(baseType :string) :RequestSequence {

  const requestSequenceActionType :string = `${baseType}/${REQUEST}`.toUpperCase();
  const successSequenceActionType :string = `${baseType}/${SUCCESS}`.toUpperCase();
  const failureSequenceActionType :string = `${baseType}/${FAILURE}`.toUpperCase();
  const finallySequenceActionType :string = `${baseType}/${FINALLY}`.toUpperCase();

  let triggerCallCount :number = 0;
  let requestCallCount :number = 0;
  let successCallCount :number = 0;
  let failureCallCount :number = 0;
  let finallyCallCount :number = 0;

  const sequenceIds :{[key :number] :string} = {};

  const triggerActionCreator :SequenceActionCreator = (data :any) :SequenceAction => {
    triggerCallCount += 1;
    sequenceIds[triggerCallCount] = randomId();
    return getSequenceAction(sequenceIds[triggerCallCount], baseType, data);
  };

  const requestActionCreator :SequenceActionCreator = (data :any) :SequenceAction => {
    if (requestCallCount + 1 === triggerCallCount) {
      requestCallCount += 1;
    }
    return getSequenceAction(sequenceIds[requestCallCount], requestSequenceActionType, data);
  };

  const successActionCreator :SequenceActionCreator = (data :any) :SequenceAction => {
    if (successCallCount + 1 === triggerCallCount) {
      successCallCount += 1;
    }
    return getSequenceAction(sequenceIds[successCallCount], successSequenceActionType, data);
  };

  const failureActionCreator :SequenceActionCreator = (data :any) :SequenceAction => {
    if (failureCallCount + 1 === triggerCallCount) {
      failureCallCount += 1;
    }
    return getSequenceAction(sequenceIds[failureCallCount], failureSequenceActionType, data);
  };

  const finallyActionCreator :SequenceActionCreator = (data :any) :SequenceAction => {
    if (finallyCallCount + 1 === triggerCallCount) {
      finallyCallCount += 1;
    }
    return getSequenceAction(sequenceIds[finallyCallCount], finallySequenceActionType, data);
  };

  triggerActionCreator.REQUEST = requestSequenceActionType;
  triggerActionCreator.SUCCESS = successSequenceActionType;
  triggerActionCreator.FAILURE = failureSequenceActionType;
  triggerActionCreator.FINALLY = finallySequenceActionType;

  triggerActionCreator.request = requestActionCreator;
  triggerActionCreator.success = successActionCreator;
  triggerActionCreator.failure = failureActionCreator;
  triggerActionCreator.finally = finallyActionCreator;

  triggerActionCreator.case = getSwitchCaseMatcher(baseType, triggerActionCreator);
  triggerActionCreator.reducer = getSequenceReducer(baseType);

  // as of v0.57, FLow doesn't support this use case: https://github.com/facebook/flow/issues/5224
  // workaround: typecast to less the specific "any" type
  return (triggerActionCreator :any);
}

export type {
  RequestSequence
};
