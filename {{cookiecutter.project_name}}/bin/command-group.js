module.exports = function(cliPath) {
  var CLI = require(cliPath).default;
  new CLI().parse(process.argv);
};
