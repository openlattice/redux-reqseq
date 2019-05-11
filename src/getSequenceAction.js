/*
 * @flow
 */

type SequenceAction = {
  +id :string;
  +type :string;
  value :any;
};

type SequenceActionCreator = (...args :any[]) => SequenceAction;

export default function getSequenceAction(id :string, type :string, value :any) :SequenceAction {

  if (value === null || value === undefined) {
    return {
      id,
      type,
      value: {},
    };
  }

  return {
    id,
    type,
    value,
  };
}

export type {
  SequenceAction,
  SequenceActionCreator,
};
