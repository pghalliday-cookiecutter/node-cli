import dslConfig from './dsl-config';
import DSLLoader from './dsl-loader';
import constants from '../../../constants';

export default class Config {
  constructor() {
    this.dslLoader = new DSLLoader(dslConfig, {
      pathField: constants.CONFIG_PATH_FIELD,
    });
  }

  * load(configPath) {
    return yield this.dslLoader.load(configPath);
  }
}
