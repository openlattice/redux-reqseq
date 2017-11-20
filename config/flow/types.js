/*
 * @flow
 */

/* eslint-disable no-undef */

declare type SequenceActionType =
  | 'REQUEST'
  | 'SUCCESS'
  | 'FAILURE'
  | 'FINALLY';

declare type SubReducers = {
  REQUEST ? :() => any;
  SUCCESS ? :() => any;
  FAILURE ? :() => any;
  FINALLY ? :() => any;
};

declare type SequenceAction = {
  data :Object;
  id :string;
  type :string;
};

declare type SequenceActionCreator = (...args :any[]) => SequenceAction;
declare type SequenceReducer = (state :any, action :SequenceAction, subReducers :SubReducers) => any;
declare type SwitchCaseMatcher = (type :string) => string;

declare type RequestSequence = {
  REQUEST :'REQUEST';
  SUCCESS :'SUCCESS';
  FAILURE :'FAILURE';
  FINALLY :'FINALLY';
  request :SequenceActionCreator;
  success :SequenceActionCreator;
  failure :SequenceActionCreator;
  finally :SequenceActionCreator;
  $call :SequenceActionCreator;
  case :SwitchCaseMatcher;
  reducer :SequenceReducer;
};
