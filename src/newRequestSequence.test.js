/*
 * @flow
 */
import newRequestSequence from './newRequestSequence';
import { REQUEST, SUCCESS, FAILURE, FINALLY } from './actionTypes';

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

    let action1 :SequenceAction = reqseq1();
    let action2 :SequenceAction = reqseq2();
    expect(action1.id).not.toEqual(action2.id);

    action1 = reqseq1.request();
    action2 = reqseq2.request();
    expect(action1.id).not.toEqual(action2.id);

    action1 = reqseq1.success();
    action2 = reqseq2.success();
    expect(action1.id).not.toEqual(action2.id);

    action1 = reqseq1.failure();
    action2 = reqseq2.failure();
    expect(action1.id).not.toEqual(action2.id);

    action1 = reqseq1.finally();
    action2 = reqseq2.finally();
    expect(action1.id).not.toEqual(action2.id);
  });

  describe('SequenceAcion objects should have the same id for actions within the sequence lifecycle', () => {

    // trigger the first sequence lifecycle
    const reqseq :RequestSequence = newRequestSequence(REQ_SEQ);
    const action1 :SequenceAction = reqseq();

    // invoke each lifecycle action twice to make sure the id stays the same
    expect(reqseq.request().id).toEqual(action1.id);
    expect(reqseq.request().id).toEqual(action1.id);

    expect(reqseq.success().id).toEqual(action1.id);
    expect(reqseq.success().id).toEqual(action1.id);

    expect(reqseq.failure().id).toEqual(action1.id);
    expect(reqseq.failure().id).toEqual(action1.id);

    expect(reqseq.finally().id).toEqual(action1.id);
    expect(reqseq.finally().id).toEqual(action1.id);

    // trigger the second sequence lifecycle
    const action2 :SequenceAction = reqseq();

    // invoke each lifecycle action twice to make sure the id stays the same
    // the second sequence lifecycle id should be different than the first sequence lifecycle id
    expect(reqseq.request().id).toEqual(action2.id);
    expect(reqseq.request().id).toEqual(action2.id);
    expect(reqseq.request().id).not.toEqual(action1.id);

    expect(reqseq.success().id).toEqual(action2.id);
    expect(reqseq.success().id).toEqual(action2.id);
    expect(reqseq.success().id).not.toEqual(action1.id);

    expect(reqseq.failure().id).toEqual(action2.id);
    expect(reqseq.failure().id).toEqual(action2.id);
    expect(reqseq.failure().id).not.toEqual(action1.id);

    expect(reqseq.finally().id).toEqual(action2.id);
    expect(reqseq.finally().id).toEqual(action2.id);
    expect(reqseq.finally().id).not.toEqual(action1.id);
  });

});
