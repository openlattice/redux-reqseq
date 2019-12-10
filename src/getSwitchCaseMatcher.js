/*
 * @flow
 */

import { isNonEmptyString } from './utils/utils';

type SwitchCaseMatcher = (type :string) => string;
type RequestSequenceActionTypes = {|
  REQUEST :string;
  SUCCESS :string;
  FAILURE :string;
  FINALLY :string;
|};

export default function getSwitchCaseMatcher(
  baseType :string,
  actionTypes :RequestSequenceActionTypes,
) :SwitchCaseMatcher {

  return (switchType :string) :string => {

    if (!isNonEmptyString(switchType)) {
      return baseType;
    }

    const slashIndex :number = switchType.lastIndexOf('/');
    if (slashIndex > 0 && slashIndex < switchType.length) {
      const actionType = switchType.substring(slashIndex + 1);
      return (actionTypes[actionType] === switchType) ? switchType : baseType;
    }

    return baseType;
  };
}

export type {
  SwitchCaseMatcher,
};
