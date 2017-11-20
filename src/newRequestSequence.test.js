/*
 * @flow
 */
import newRequestSequence from './newRequestSequence';
import { REQUEST, SUCCESS, FAILURE, FINALLY } from './actionTypes';

const REQ_SEQ :'REQ_SEQ' = 'REQ_SEQ';
const reqseq = newRequestSequence(REQ_SEQ);

describe('newRequestSequence', () => {

  test('newRequestSequence should be a function', () => {
    expect(newRequestSequence).toBeInstanceOf(Function);
  });

  describe('RequestSequence functions should have sequence action types', () => {

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

    test('should have case', () => {
      expect(reqseq.case).toBeInstanceOf(Function);
    });

    test('should have reducer', () => {
      expect(reqseq.reducer).toBeInstanceOf(Function);
    });

  });

});
