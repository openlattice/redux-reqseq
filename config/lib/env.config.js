/*
 * @flow
 */

function ifElse(condition :boolean) :Function {
  return (isTrue :any, isFalse :any) => {
    return condition ? isTrue : isFalse;
  };
}

const BUILD :string = process.env.BUILD || 'development';
const MINIMIZE :string = process.env.MINIMIZE || 'false';
const TARGET_ENV :string = process.env.TARGET_ENV || 'web';

const isDev :boolean = BUILD === 'development';
const isProd :boolean = BUILD === 'production';
const isTest :boolean = BUILD === 'test';

const ifDev :Function = ifElse(isDev);
const ifProd :Function = ifElse(isProd);
const ifTest :Function = ifElse(isTest);

const ifMin :Function = ifElse(MINIMIZE === 'true');

export {
  TARGET_ENV,
  ifDev,
  ifMin,
  ifProd,
  ifTest,
  isDev,
  isProd,
  isTest
};
