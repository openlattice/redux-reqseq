/*
 * @flow
 */

export default function getSequenceAction(id :string, type :string, value :?mixed) :SequenceAction {

  if (value === null || value === undefined) {
    return {
      id,
      type
    };
  }

  return {
    id,
    type,
    value
  };
}
