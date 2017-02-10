import path from 'path';
import _ncp from 'ncp';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import co from 'co';
import promisify from '../../../src/helpers/promisify';

const ncp = promisify(_ncp);

const root = path.resolve(path.join(
  __dirname,
  '..',
  '..',
  '..'
));
const fixtures = path.join(root, 'test', 'unit', 'fixtures');
const temp = path.join(root, 'temp');
const home = path.join(temp, 'home');
const cwd = path.join(temp, 'cwd');

export function setup() {
  rimraf.sync(temp);
  mkdirp.sync(home);
  mkdirp.sync(cwd);
  process.chdir(cwd);
  process.env[
    (process.platform === 'win32') ? 'USERPROFILE' : 'HOME'
  ] = home;
}

export function initialize(fixture) {
  return co(function* () {
    yield ncp(path.join(fixtures, fixture), temp);
    process.chdir(cwd);
  });
}

export function cleanup() {
  setup();
  // clear anything from temp from the require cache
  Object.keys(require.cache).forEach((path) => {
    if (path.startsWith(temp)) {
      delete require.cache[path];
    }
  });
}
