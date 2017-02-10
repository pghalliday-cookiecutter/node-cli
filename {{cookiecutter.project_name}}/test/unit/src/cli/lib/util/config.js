import co from 'co';
import path from 'path';
import Config from '../../../../../../src/cli/lib/util/config';

const RELATIVE_PATH = path.join(
  '..',
  '..',
  'test',
  'unit',
  'fixtures',
  'config',
  'config.js'
);
const ABSOLUTE_PATH = path.resolve(
  RELATIVE_PATH
);

describe('cli', () => {
  describe('lib', () => {
    describe('util', () => {
      describe('Config', () => {
        let config;
        let loadedConfig;
        beforeEach(() => {
          config = new Config();
          return co(function* () {
            loadedConfig = yield config.load();
          });
        });

        it('should apply defaults', () => {
          loadedConfig.should.eql({
            logLevel: 'info',
          });
        });

        describe('#load', () => {
          beforeEach(() => {
            return co(function* () {
              loadedConfig = yield config.load(RELATIVE_PATH);
            });
          });

          it('should set the configuration from the DSL callback', () => {
            loadedConfig.should.eql({
              _configPath: ABSOLUTE_PATH,
              logLevel: 'logLevel',
            });
          });
        });
      });
    });
  });
});
