require('babel-polyfill');
var co = require('co');

module.exports = function(cliPath) {
  var CLI = require(cliPath).default;
  co(function* () {
    var cli = new CLI();
    try {
      yield cli.parse(process.argv);
    } catch (e) {
      cli.logger.error(e);
      process.exit(1);
    }
  });
};
