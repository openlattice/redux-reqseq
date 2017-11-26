/*
 * @flow
 */

export default function getSequenceAction(id :string, type :string, value :?Object) :SequenceAction {

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
