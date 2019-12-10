/*
 * @flow
 */

import getSequenceReducer from './getSequenceReducer';
import {
  FAILURE,
  FINALLY,
  REQUEST,
  SUCCESS,
} from './ActionTypes';
import {
  testShouldInvokeCorrectSubReducer,
  testShouldThrowOnInvalidSubReducer,
} from './utils/tests';
import { randomStringId } from './utils/utils';

const REQ_SEQ :'REQ_SEQ' = 'REQ_SEQ';

const MOCK_INITIAL_STATE = {
  id: randomStringId(),
  hello: 'world',
  list: [1, 2, 3],
  obj: {
    foo: 'bar'
  }
};

describe('getSequenceReducer', () => {

  test('should be a function', () => {
    expect(getSequenceReducer).toBeInstanceOf(Function);
  });

  test('invocation should return a function', () => {
    expect(getSequenceReducer(REQ_SEQ)).toBeInstanceOf(Function);
  });

  describe(`${REQUEST} sub-reducer`, () => {

    describe('given an action object', () => {
      const state = {};
      const action = { id: randomStringId(), type: `${REQ_SEQ}/${REQUEST}` };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      testShouldThrowOnInvalidSubReducer(seqReducer, state, action, REQUEST);
      testShouldInvokeCorrectSubReducer(seqReducer, state, action, REQUEST);
    });

    describe('given an action type', () => {
      const state = {};
      const actionType = `${REQ_SEQ}/${REQUEST}`;
      const seqReducer = getSequenceReducer(REQ_SEQ);
      testShouldThrowOnInvalidSubReducer(seqReducer, state, actionType, REQUEST);
      testShouldInvokeCorrectSubReducer(seqReducer, state, actionType, REQUEST);
    });

  });

  describe(`${SUCCESS} sub-reducer`, () => {

    describe('given an action object', () => {
      const state = {};
      const action = { id: randomStringId(), type: `${REQ_SEQ}/${SUCCESS}` };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      testShouldThrowOnInvalidSubReducer(seqReducer, state, action, SUCCESS);
      testShouldInvokeCorrectSubReducer(seqReducer, state, action, SUCCESS);
    });

    describe('given an action type', () => {
      const state = {};
      const actionType = `${REQ_SEQ}/${SUCCESS}`;
      const seqReducer = getSequenceReducer(REQ_SEQ);
      testShouldThrowOnInvalidSubReducer(seqReducer, state, actionType, SUCCESS);
      testShouldInvokeCorrectSubReducer(seqReducer, state, actionType, SUCCESS);
    });

  });

  describe(`${FAILURE} sub-reducer`, () => {

    describe('given an action object', () => {
      const state = {};
      const action = { id: randomStringId(), type: `${REQ_SEQ}/${FAILURE}` };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      testShouldThrowOnInvalidSubReducer(seqReducer, state, action, FAILURE);
      testShouldInvokeCorrectSubReducer(seqReducer, state, action, FAILURE);
    });

    describe('given an action type', () => {
      const state = {};
      const actionType = `${REQ_SEQ}/${FAILURE}`;
      const seqReducer = getSequenceReducer(REQ_SEQ);
      testShouldThrowOnInvalidSubReducer(seqReducer, state, actionType, FAILURE);
      testShouldInvokeCorrectSubReducer(seqReducer, state, actionType, FAILURE);
    });

  });

  describe(`${FINALLY} sub-reducer`, () => {

    describe('given an action object', () => {
      const state = {};
      const action = { id: randomStringId(), type: `${REQ_SEQ}/${FINALLY}` };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      testShouldThrowOnInvalidSubReducer(seqReducer, state, action, FINALLY);
      testShouldInvokeCorrectSubReducer(seqReducer, state, action, FINALLY);
    });

    describe('given an action type', () => {
      const state = {};
      const actionType = `${REQ_SEQ}/${FINALLY}`;
      const seqReducer = getSequenceReducer(REQ_SEQ);
      testShouldThrowOnInvalidSubReducer(seqReducer, state, actionType, FINALLY);
      testShouldInvokeCorrectSubReducer(seqReducer, state, actionType, FINALLY);
    });
  });

  describe('default case', () => {

    const mockRequestReducer = jest.fn();
    const mockSuccessReducer = jest.fn();
    const mockFailureReducer = jest.fn();
    const mockFinallyReducer = jest.fn();

    beforeEach(() => {
      mockRequestReducer.mockClear();
      mockSuccessReducer.mockClear();
      mockFailureReducer.mockClear();
      mockFinallyReducer.mockClear();
    });

    test('should return given state if sub-reducer action type is not a string', () => {

      const action = { id: randomStringId(), type: 123, value: {} };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      // $FlowFixMe
      const newState = seqReducer(MOCK_INITIAL_STATE, action, {
        [REQUEST]: mockRequestReducer,
        [SUCCESS]: mockSuccessReducer,
        [FAILURE]: mockFailureReducer,
        [FINALLY]: mockFinallyReducer
      });

      expect(newState).toBe(MOCK_INITIAL_STATE);
      expect(mockRequestReducer).not.toHaveBeenCalled();
      expect(mockSuccessReducer).not.toHaveBeenCalled();
      expect(mockFailureReducer).not.toHaveBeenCalled();
      expect(mockFinallyReducer).not.toHaveBeenCalled();
    });

    test('should return given state if sub-reducer action type does not match', () => {

      const action = { id: randomStringId(), type: '__TEST__', value: {} };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      const newState = seqReducer(MOCK_INITIAL_STATE, action, {
        [REQUEST]: mockRequestReducer,
        [SUCCESS]: mockSuccessReducer,
        [FAILURE]: mockFailureReducer,
        [FINALLY]: mockFinallyReducer
      });

      expect(newState).toBe(MOCK_INITIAL_STATE);
      expect(mockRequestReducer).not.toHaveBeenCalled();
      expect(mockSuccessReducer).not.toHaveBeenCalled();
      expect(mockFailureReducer).not.toHaveBeenCalled();
      expect(mockFinallyReducer).not.toHaveBeenCalled();
    });

    test(`should return given state if ${REQUEST} sub-reducer is missing`, () => {

      const action = { id: randomStringId(), type: `${REQ_SEQ}/${REQUEST}`, value: {} };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      const newState = seqReducer(MOCK_INITIAL_STATE, action, {
        [SUCCESS]: mockSuccessReducer,
        [FAILURE]: mockFailureReducer,
        [FINALLY]: mockFinallyReducer
      });

      expect(newState).toBe(MOCK_INITIAL_STATE);
      expect(mockSuccessReducer).not.toHaveBeenCalled();
      expect(mockFailureReducer).not.toHaveBeenCalled();
      expect(mockFinallyReducer).not.toHaveBeenCalled();
    });

    test(`should return given state if ${SUCCESS} sub-reducer is missing`, () => {

      const action = { id: randomStringId(), type: `${REQ_SEQ}/${SUCCESS}`, value: {} };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      const newState = seqReducer(MOCK_INITIAL_STATE, action, {
        [REQUEST]: mockRequestReducer,
        [FAILURE]: mockFailureReducer,
        [FINALLY]: mockFinallyReducer
      });

      expect(newState).toBe(MOCK_INITIAL_STATE);
      expect(mockRequestReducer).not.toHaveBeenCalled();
      expect(mockFailureReducer).not.toHaveBeenCalled();
      expect(mockFinallyReducer).not.toHaveBeenCalled();
    });

    test(`should return given state if ${FAILURE} sub-reducer is missing`, () => {

      const action = { id: randomStringId(), type: `${REQ_SEQ}/${FAILURE}`, value: {} };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      const newState = seqReducer(MOCK_INITIAL_STATE, action, {
        [REQUEST]: mockRequestReducer,
        [SUCCESS]: mockSuccessReducer,
        [FINALLY]: mockFinallyReducer
      });

      expect(newState).toBe(MOCK_INITIAL_STATE);
      expect(mockRequestReducer).not.toHaveBeenCalled();
      expect(mockSuccessReducer).not.toHaveBeenCalled();
      expect(mockFinallyReducer).not.toHaveBeenCalled();
    });

    test(`should return given state if ${FINALLY} sub-reducer is missing`, () => {

      const action = { id: randomStringId(), type: `${REQ_SEQ}/${FINALLY}`, value: {} };
      const seqReducer = getSequenceReducer(REQ_SEQ);
      const newState = seqReducer(MOCK_INITIAL_STATE, action, {
        [REQUEST]: mockRequestReducer,
        [SUCCESS]: mockSuccessReducer,
        [FAILURE]: mockFailureReducer
      });

      expect(newState).toBe(MOCK_INITIAL_STATE);
      expect(mockRequestReducer).not.toHaveBeenCalled();
      expect(mockSuccessReducer).not.toHaveBeenCalled();
      expect(mockFailureReducer).not.toHaveBeenCalled();
    });

  });

});
