/*
 * @flow
 */

export default function getSequenceAction(data :any, id :string, type :string) :SequenceAction {

  return {
    id,
    type,
    data: {
      ...data
    }
  };
}
