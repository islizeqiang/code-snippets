const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  ignoreFiles: ['**/*.js', '**/*.jsx'],
};
