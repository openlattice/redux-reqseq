/*
 * @flow
 */
import newRequestSequence from './newRequestSequence';
import { INVALID_PARAMS } from './utils/invalid';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  FINALLY
} from './actionTypes';

const REQ_SEQ :'REQ_SEQ' = 'REQ_SEQ';

describe('newRequestSequence', () => {

  test('newRequestSequence should be a function', () => {
    expect(newRequestSequence).toBeInstanceOf(Function);
  });

  describe('RequestSequence functions should have sequence action types', () => {

    const reqseq = newRequestSequence(REQ_SEQ);

    test(`should have ${REQUEST}`, () => {
      expect(reqseq.REQUEST).toEqual(`${REQ_SEQ}/${REQUEST}`);
    });

    test(`should have ${SUCCESS}`, () => {
      expect(reqseq.SUCCESS).toEqual(`${REQ_SEQ}/${SUCCESS}`);
    });

    test(`should have ${FAILURE}`, () => {
      expect(reqseq.FAILURE).toEqual(`${REQ_SEQ}/${FAILURE}`);
    });

    test(`should have ${FINALLY}`, () => {
      expect(reqseq.FINALLY).toEqual(`${REQ_SEQ}/${FINALLY}`);
    });

  });

  describe('RequestSequence functions should have sequence action creators', () => {

    const reqseq = newRequestSequence(REQ_SEQ);

    test(`should have ${REQUEST.toLowerCase()}`, () => {
      expect(reqseq.request).toBeInstanceOf(Function);
    });

    test(`should have ${SUCCESS.toLowerCase()}`, () => {
      expect(reqseq.success).toBeInstanceOf(Function);
    });

    test(`should have ${FAILURE.toLowerCase()}`, () => {
      expect(reqseq.failure).toBeInstanceOf(Function);
    });

    test(`should have ${FINALLY.toLowerCase()}`, () => {
      expect(reqseq.finally).toBeInstanceOf(Function);
    });

  });

  describe('RequestSequence functions should have helper functions', () => {

    const reqseq = newRequestSequence(REQ_SEQ);

    test('should have case', () => {
      expect(reqseq.case).toBeInstanceOf(Function);
    });

    test('should have reducer', () => {
      expect(reqseq.reducer).toBeInstanceOf(Function);
    });

  });

  describe('SequenceAcion objects should have unique ids for new sequence lifecycles', () => {

    const reqseq1 :RequestSequence = newRequestSequence(REQ_SEQ);
    const reqseq2 :RequestSequence = newRequestSequence(REQ_SEQ);
    const action1 :SequenceAction = reqseq1();
    const action2 :SequenceAction = reqseq2();

    test('initial SequenceAcion ids must be different', () => {
      expect(action1.id).not.toEqual(action2.id);
    });

    test('request() SequenceAcion ids must be different', () => {
      const requestAction1 = reqseq1.request(action1.id);
      const requestAction2 = reqseq2.request(action2.id);
      expect(requestAction1.id).not.toEqual(requestAction2.id);
    });

    test('success() SequenceAcion ids must be different', () => {
      const successAction1 = reqseq1.success(action1.id);
      const successAction2 = reqseq2.success(action2.id);
      expect(successAction1.id).not.toEqual(successAction2.id);
    });

    test('failure() SequenceAcion ids must be different', () => {
      const failureAction1 = reqseq1.failure(action1.id);
      const failureAction2 = reqseq2.failure(action2.id);
      expect(failureAction1.id).not.toEqual(failureAction2.id);
    });

    test('finally() SequenceAcion ids must be different', () => {
      const finallyAction1 = reqseq1.finally(action1.id);
      const finallyAction2 = reqseq2.finally(action2.id);
      expect(finallyAction1.id).not.toEqual(finallyAction2.id);
    });

  });

  describe('SequenceAcion objects should have the same id for actions within the sequence lifecycle', () => {

    const reqseq :RequestSequence = newRequestSequence(REQ_SEQ);
    const action :SequenceAction = reqseq();

    test('request() SequenceAcion id must be the same', () => {
      const requestAction = reqseq.request(action.id);
      expect(requestAction.id).toEqual(action.id);
    });

    test('success() SequenceAcion id must be the same', () => {
      const successAction = reqseq.success(action.id);
      expect(successAction.id).toEqual(action.id);
    });

    test('failure() SequenceAcion id must be the same', () => {
      const failureAction = reqseq.failure(action.id);
      expect(failureAction.id).toEqual(action.id);
    });

    test('finally() SequenceAcion id must be the same', () => {
      const finallyAction = reqseq.finally(action.id);
      expect(finallyAction.id).toEqual(action.id);
    });

  });

  describe('sequence lifecycle actions cannot be called with invalid ids', () => {

    test('request() SequenceAcion should throw if called with an invalid id', () => {
      const reqseq :RequestSequence = newRequestSequence(REQ_SEQ);
      INVALID_PARAMS.forEach((invalidId :any) => {
        expect(() => reqseq.request(invalidId)).toThrow('request() has been called with an invalid id');
      });
    });

    test('success() SequenceAcion should throw if called with an invalid id', () => {
      INVALID_PARAMS.forEach((invalidId :any) => {
        const reqseq :RequestSequence = newRequestSequence(REQ_SEQ);
        expect(() => reqseq.success(invalidId)).toThrow('success() has been called with an invalid id');
      });
    });

    test('failure() SequenceAcion should throw if called with an invalid id', () => {
      INVALID_PARAMS.forEach((invalidId :any) => {
        const reqseq :RequestSequence = newRequestSequence(REQ_SEQ);
        expect(() => reqseq.failure(invalidId)).toThrow('failure() has been called with an invalid id');
      });
    });

    test('finally() SequenceAcion should throw if called with an invalid id', () => {
      INVALID_PARAMS.forEach((invalidId :any) => {
        const reqseq :RequestSequence = newRequestSequence(REQ_SEQ);
        expect(() => reqseq.finally(invalidId)).toThrow('finally() has been called with an invalid id');
      });
    });

  });

  describe('sequence lifecycle actions cannot be called multiple times', () => {

    const reqseq :RequestSequence = newRequestSequence(REQ_SEQ);
    const action :SequenceAction = reqseq();

    test('request() SequenceAcion should throw if called a second time', () => {
      expect(() => reqseq.request(action.id)).not.toThrow();
      expect(() => reqseq.request(action.id)).toThrow('request() has already been called');
    });

    test('success() SequenceAcion should throw if called a second time', () => {
      expect(() => reqseq.success(action.id)).not.toThrow();
      expect(() => reqseq.success(action.id)).toThrow('success() has already been called');
    });

    test('failure() SequenceAcion should throw if called a second time', () => {
      expect(() => reqseq.failure(action.id)).not.toThrow();
      expect(() => reqseq.failure(action.id)).toThrow('failure() has already been called');
    });

    test('finally() SequenceAcion should throw if called a second time', () => {
      expect(() => reqseq.finally(action.id)).not.toThrow();
      expect(() => reqseq.finally(action.id)).toThrow('finally() has been called with an invalid id');
    });

  });

  describe('finally() should complete a sequence and clean up', () => {

    const reqseq :RequestSequence = newRequestSequence(REQ_SEQ);
    const action :SequenceAction = reqseq();

    test('sequences should be deleted after finally() has been called', () => {
      expect(() => reqseq.finally(action.id)).not.toThrow();
      expect(() => reqseq.request(action.id)).toThrow('request() has been called with an invalid id');
      expect(() => reqseq.success(action.id)).toThrow('success() has been called with an invalid id');
      expect(() => reqseq.failure(action.id)).toThrow('failure() has been called with an invalid id');
      expect(() => reqseq.finally(action.id)).toThrow('finally() has been called with an invalid id');
    });

  });

});
