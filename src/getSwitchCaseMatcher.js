/*
 * @flow
 */

import { STRING_TAG } from './utils/utils';

function isValidType(value :any) :boolean {

  return Object.prototype.toString.call(value) === STRING_TAG && value.length > 0;
}

export default function getSwitchCaseMatcher(
  baseType :string,
  actionCreator :SequenceActionCreator
) :SwitchCaseMatcher {

  return (switchType :string) :string => {

    if (!isValidType(switchType)) {
      return baseType;
    }

    let subType :string = '';
    const slashIndex :number = switchType.lastIndexOf('/');
    if (slashIndex > 0 && slashIndex < switchType.length) {
      subType = switchType.substring(slashIndex + 1);
    }

    return (actionCreator[subType] === `${baseType}/${subType}`) ? switchType : baseType;
  };
}
