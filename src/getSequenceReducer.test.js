/*
 * @flow
 */

import getSequenceReducer from './getSequenceReducer';
import { randomStringId } from './utils/utils';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY,
} from './actionTypes';

import {
  testShouldInvokeCorrectSubReducer,
  testShouldThrowOnInvalidSubReducer,
} from './utils/tests';

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

    const state = {};
    const action = { id: randomStringId(), type: `${REQ_SEQ}/${REQUEST}` };
    const seqReducer = getSequenceReducer(REQ_SEQ);

    testShouldThrowOnInvalidSubReducer(seqReducer, state, action, REQUEST);
    testShouldInvokeCorrectSubReducer(seqReducer, state, action, REQUEST);
  });

  describe(`${SUCCESS} sub-reducer`, () => {

    const state = {};
    const action = { id: randomStringId(), type: `${REQ_SEQ}/${SUCCESS}` };
    const seqReducer = getSequenceReducer(REQ_SEQ);

    testShouldThrowOnInvalidSubReducer(seqReducer, state, action, SUCCESS);
    testShouldInvokeCorrectSubReducer(seqReducer, state, action, SUCCESS);
  });

  describe(`${FAILURE} sub-reducer`, () => {

    const state = {};
    const action = { id: randomStringId(), type: `${REQ_SEQ}/${FAILURE}` };
    const seqReducer = getSequenceReducer(REQ_SEQ);

    testShouldThrowOnInvalidSubReducer(seqReducer, state, action, FAILURE);
    testShouldInvokeCorrectSubReducer(seqReducer, state, action, FAILURE);
  });

  describe(`${FINALLY} sub-reducer`, () => {

    const state = {};
    const action = { id: randomStringId(), type: `${REQ_SEQ}/${FINALLY}` };
    const seqReducer = getSequenceReducer(REQ_SEQ);

    testShouldThrowOnInvalidSubReducer(seqReducer, state, action, FINALLY);
    testShouldInvokeCorrectSubReducer(seqReducer, state, action, FINALLY);
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
