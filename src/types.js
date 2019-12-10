/*
 * @flow
 */

import type { SequenceAction } from './getSequenceAction';
import type { SequenceReducer } from './getSequenceReducer';
import type { SwitchCaseMatcher } from './getSwitchCaseMatcher';

type RequestSequence = {
  REQUEST :string;
  SUCCESS :string;
  FAILURE :string;
  FINALLY :string;
  <V>(value ?:V) :SequenceAction<V>;
  request :<V>(id :string, value ?:V) => SequenceAction<V>;
  success :<V>(id :string, value ?:V) => SequenceAction<V>;
  failure :<V>(id :string, value ?:V) => SequenceAction<V>;
  finally :<V>(id :string, value ?:V) => SequenceAction<V>;
  baseType :string;
  case :SwitchCaseMatcher;
  reducer :SequenceReducer;
};

export type {
  RequestSequence,
};
