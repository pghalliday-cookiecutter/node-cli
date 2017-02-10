import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import constants from '../../../constants';
import promisify from '../../../helpers/promisify';

const stat = promisify(fs.stat);

/* istanbul ignore next */
const HOME = process.env[
  (process.platform === 'win32') ? 'USERPROFILE' : 'HOME'
];
const CWD = process.cwd();
const CONFIG_FILE = constants.DEFAULT_CONFIG_FILE_NAME;

function* checkPath(file) {
  try {
    yield stat(file);
    return file;
  } catch (e) {
    return;
  }
}

export default function* configFile(file) {
  if (_.isUndefined(file)) {
    file = yield checkPath(path.join(CWD, CONFIG_FILE));
    if (_.isUndefined(file)) {
      file = yield checkPath(path.join(HOME, CONFIG_FILE));
    }
  } else {
    yield stat(file);
  }
  return file;
}
