/*
 * @flow
 */

export default function getSwitchCaseMatcher(
  baseType :string,
  actionCreator :SequenceActionCreator
) :SwitchCaseMatcher {

  return (switchType :string) :string => {

    let parsed :string = '';
    const slashIndex :number = switchType.lastIndexOf('/');
    if (slashIndex > 0 && slashIndex < switchType.length) {
      parsed = switchType.substring(slashIndex + 1);
    }

    return (actionCreator[parsed] === switchType) ? switchType : baseType;
  };
}
