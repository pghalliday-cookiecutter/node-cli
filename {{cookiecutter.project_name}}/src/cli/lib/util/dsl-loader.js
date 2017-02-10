import DSLConfig from 'dsl-config';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import promisify from '../../../helpers/promisify';

const readFile = promisify(fs.readFile);

export default class DSLLoader {
  constructor(dslConfig, options) {
    this.pathField = options ? options.pathField : undefined;
    this.dslConfig = dslConfig;
  }

  * load(file) {
    const dslConfig = new DSLConfig(this.dslConfig);
    const defaults = dslConfig.config;
    if (_.isUndefined(file)) {
      return defaults;
    }
    const absPath = path.resolve(file);
    const pathField = {};
    if (this.pathField) {
      pathField[this.pathField] = absPath;
    }
    if (absPath.endsWith('.json')) {
      const json = yield readFile(absPath);
      return _.merge(defaults, JSON.parse(json), pathField);
    }
    const exports = require(absPath);
    if (typeof exports === 'object') {
      return _.merge(defaults, exports, pathField);
    }
    if (typeof exports === 'function') {
      const config = yield Promise.resolve(dslConfig.configure(exports));
      return _.merge(config, pathField);
    }
    throw new Error('Invalid exports');
  }
}
