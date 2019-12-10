/*
 * @flow
 */

// "<V :mixed = {}>" means V defaults to type "{}", which seems to allow us to do ":SequenceAction<>"
type SequenceAction<SequenceActionValue :mixed = {}> = {|
  +id :string;
  +type :string;
  value :SequenceActionValue;
|};

export default function getSequenceAction<V>(id :string, type :string, value ?:V) :SequenceAction<V | {}> {

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
};
