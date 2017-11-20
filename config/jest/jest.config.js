const PACKAGE = require('../../package.json');

module.exports = {
  globals: {
    __VERSION__: PACKAGE.version
  },
  rootDir: '../..'
};
