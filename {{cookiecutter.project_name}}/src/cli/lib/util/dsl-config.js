import DSLConfig from 'dsl-config';
import constants from '../../../constants';

export default new DSLConfig()
.value('logLevel', constants.DEFAULT_LOG_LEVEL);

