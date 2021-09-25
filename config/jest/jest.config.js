const PACKAGE = require('../../package.json');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.js',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/config/',
    '<rootDir>/flow-typed/',
    '<rootDir>/src/utils/invalid.js',
    '<rootDir>/src/utils/tests.js',
  ],
  globals: {
    __ENV_DEV__: false,
    __ENV_PROD__: false,
    __PACKAGE__: PACKAGE.name,
    __VERSION__: PACKAGE.version,
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/flow-typed/',
  ],
  rootDir: '../..',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/config/jest/babelJestTransformer.js',
  },
};
