/*
 * @flow
 */

import getSequenceAction from './getSequenceAction';
import getSequenceReducer from './getSequenceReducer';
import getSwitchCaseMatcher from './getSwitchCaseMatcher';
import { STRING_TAG, randomStringId } from './utils/utils';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY,
} from './ActionTypes';

/*
 * TODO: need logger
 */

function isValidId(value :any) :boolean {

  return Object.prototype.toString.call(value) === STRING_TAG && value.length > 0;
}

export default function newRequestSequence(baseType :string) :RequestSequence {

  const requestSequenceActionType :string = `${baseType}/${REQUEST}`.toUpperCase();
  const successSequenceActionType :string = `${baseType}/${SUCCESS}`.toUpperCase();
  const failureSequenceActionType :string = `${baseType}/${FAILURE}`.toUpperCase();
  const finallySequenceActionType :string = `${baseType}/${FINALLY}`.toUpperCase();

  const sequences :{[key :string] :Object} = {};

  const triggerActionCreator :SequenceActionCreator = (triggerValue :any) :SequenceAction => {
    const id :string = randomStringId();
    sequences[id] = {
      requestCalled: false,
      successCalled: false,
      failureCalled: false,
      request: (requestValue :any) => getSequenceAction(id, requestSequenceActionType, requestValue),
      success: (successValue :any) => getSequenceAction(id, successSequenceActionType, successValue),
      failure: (failureValue :any) => getSequenceAction(id, failureSequenceActionType, failureValue),
      finally: (finallyValue :any) => getSequenceAction(id, finallySequenceActionType, finallyValue)
    };
    return getSequenceAction(id, baseType, triggerValue);
  };

  const requestActionCreator :SequenceActionCreator = (id :string, value :any) :SequenceAction => {
    if (!isValidId(id) || !sequences[id]) {
      throw new Error('request() has been called with an invalid id');
    }
    if (sequences[id].requestCalled === true) {
      throw new Error('request() has already been called');
    }
    sequences[id].requestCalled = true;
    return sequences[id].request(value);
  };

  const successActionCreator :SequenceActionCreator = (id :string, value :any) :SequenceAction => {
    if (!isValidId(id) || !sequences[id]) {
      throw new Error('success() has been called with an invalid id');
    }
    if (sequences[id].successCalled === true) {
      throw new Error('success() has already been called');
    }
    sequences[id].successCalled = true;
    return sequences[id].success(value);
  };

  const failureActionCreator :SequenceActionCreator = (id :string, value :any) :SequenceAction => {
    if (!isValidId(id) || !sequences[id]) {
      throw new Error('failure() has been called with an invalid id');
    }
    if (sequences[id].failureCalled === true) {
      throw new Error('failure() has already been called');
    }
    sequences[id].failureCalled = true;
    return sequences[id].failure(value);
  };

  const finallyActionCreator :SequenceActionCreator = (id :string, value :any) :SequenceAction => {
    if (!isValidId(id) || !sequences[id]) {
      throw new Error('finally() has been called with an invalid id');
    }
    const sequence = sequences[id];
    delete sequences[id];
    return sequence.finally(value);
  };

  triggerActionCreator.REQUEST = requestSequenceActionType;
  triggerActionCreator.SUCCESS = successSequenceActionType;
  triggerActionCreator.FAILURE = failureSequenceActionType;
  triggerActionCreator.FINALLY = finallySequenceActionType;

  triggerActionCreator.request = requestActionCreator;
  triggerActionCreator.success = successActionCreator;
  triggerActionCreator.failure = failureActionCreator;
  triggerActionCreator.finally = finallyActionCreator;

  triggerActionCreator.baseType = baseType;
  triggerActionCreator.case = getSwitchCaseMatcher(baseType, triggerActionCreator);
  triggerActionCreator.reducer = getSequenceReducer(baseType);

  // as of v0.57, FLow doesn't support this use case: https://github.com/facebook/flow/issues/5224
  // workaround: typecast to less the specific "any" type
  return (triggerActionCreator :any);
}
