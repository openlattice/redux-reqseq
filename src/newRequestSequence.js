/*
 * @flow
 */

import getSequenceAction from './getSequenceAction';
import getSequenceReducer from './getSequenceReducer';
import getSwitchCaseMatcher from './getSwitchCaseMatcher';
import {
  FAILURE,
  FINALLY,
  REQUEST,
  SUCCESS,
} from './ActionTypes';
import { isNonEmptyString, randomStringId } from './utils/utils';
import type { SequenceAction, SequenceActionCreator } from './getSequenceAction';
import type { RequestSequence } from './types';

/*
 * TODO: need logger
 */

export default function newRequestSequence(baseType :string) :RequestSequence {

  const sequences = {};
  const rsActionTypes = {
    [REQUEST]: `${baseType}/${REQUEST}`.toUpperCase(),
    [SUCCESS]: `${baseType}/${SUCCESS}`.toUpperCase(),
    [FAILURE]: `${baseType}/${FAILURE}`.toUpperCase(),
    [FINALLY]: `${baseType}/${FINALLY}`.toUpperCase(),
  };

  const requestSequence = <V>(triggerValue ?:V) :SequenceAction<V> => {
    const id :string = randomStringId();
    sequences[id] = {
      requestCalled: false,
      successCalled: false,
      failureCalled: false,
      request: <RequestValue>(value ?:RequestValue) => getSequenceAction(id, rsActionTypes[REQUEST], value),
      success: <SuccessValue>(value ?:SuccessValue) => getSequenceAction(id, rsActionTypes[SUCCESS], value),
      failure: <FailureValue>(value ?:FailureValue) => getSequenceAction(id, rsActionTypes[FAILURE], value),
      finally: <FinallyValue>(value ?:FinallyValue) => getSequenceAction(id, rsActionTypes[FINALLY], value),
    };
    // $FlowFixMe
    return getSequenceAction(id, baseType, triggerValue);
  };

  const requestActionCreator :SequenceActionCreator = <V>(id :string, value ?:V) :SequenceAction<V> => {
    if (!isNonEmptyString(id) || !sequences[id]) {
      throw new Error('request() has been called with an invalid id');
    }
    if (sequences[id].requestCalled === true) {
      throw new Error('request() has already been called');
    }
    sequences[id].requestCalled = true;
    return sequences[id].request(value);
  };

  const successActionCreator :SequenceActionCreator = <V>(id :string, value ?:V) :SequenceAction<V> => {
    if (!isNonEmptyString(id) || !sequences[id]) {
      throw new Error('success() has been called with an invalid id');
    }
    if (sequences[id].successCalled === true) {
      throw new Error('success() has already been called');
    }
    sequences[id].successCalled = true;
    return sequences[id].success(value);
  };

  const failureActionCreator :SequenceActionCreator = <V>(id :string, value ?:V) :SequenceAction<V> => {
    if (!isNonEmptyString(id) || !sequences[id]) {
      throw new Error('failure() has been called with an invalid id');
    }
    if (sequences[id].failureCalled === true) {
      throw new Error('failure() has already been called');
    }
    sequences[id].failureCalled = true;
    return sequences[id].failure(value);
  };

  const finallyActionCreator :SequenceActionCreator = <V>(id :string, value ?:V) :SequenceAction<V> => {
    if (!isNonEmptyString(id) || !sequences[id]) {
      throw new Error('finally() has been called with an invalid id');
    }
    const sequence = sequences[id];
    delete sequences[id];
    return sequence.finally(value);
  };

  requestSequence.REQUEST = rsActionTypes[REQUEST];
  requestSequence.SUCCESS = rsActionTypes[SUCCESS];
  requestSequence.FAILURE = rsActionTypes[FAILURE];
  requestSequence.FINALLY = rsActionTypes[FINALLY];

  requestSequence.request = requestActionCreator;
  requestSequence.success = successActionCreator;
  requestSequence.failure = failureActionCreator;
  requestSequence.finally = finallyActionCreator;

  requestSequence.baseType = baseType;
  requestSequence.case = getSwitchCaseMatcher(baseType, rsActionTypes);
  requestSequence.reducer = getSequenceReducer(baseType);

  // $FlowFixMe
  return requestSequence;
}

export type {
  RequestSequence,
};
