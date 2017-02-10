import 'co-mocha';
import {setup} from './temp-fixture';
import path from 'path';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.should();
chai.use(chaiAsPromised);

// seed the require cache with mocks
function seedRequireCache(path, exports) {
  if (require.cache[path]) {
    require.cache[path].exports = exports;
  } else {
    require.cache[path] = {
      id: path,
      filename: path,
      loaded: true,
      exports: exports,
    };
  }
}
seedRequireCache(
  path.resolve('node_modules/commander/index.js'),
  require('./commander')
);
seedRequireCache(
  path.resolve('node_modules/winston/lib/winston.js'),
  require('./winston')
);

// set up a temporary directory for HOME and CWD
setup();

