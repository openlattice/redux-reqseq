const PACKAGE = require('../../package.json');

module.exports = {
  coveragePathIgnorePatterns: [
    '<rootDir>/src/utils/invalid.js',
    '<rootDir>/src/utils/tests.js'
  ],
  globals: {
    __VERSION__: PACKAGE.version
  },
  rootDir: '../..'
};
