// This module exists to deal with the deprecation of
// new Buffer() as of node 6.x
//
// The problem is that the replacement Buffer.from()
// methods are not complete in 4.x and we want to support 4.x
//
// NB. This module will be ignored by coverage as
// it depends on node version

const semver = require('semver');
const isNewBufferDeprecated = semver.satisfies(process.version, '>=6.0.0');

// istanbul ignore next
if (isNewBufferDeprecated) {
  module.exports = function(content, encoding) {
    if (typeof content === 'number') {
      return Buffer.alloc(content);
    }
    return Buffer.from(content, encoding);
  };
} else {
  module.exports = function(content, encoding) {
    return new Buffer(content, encoding);
  };
}
