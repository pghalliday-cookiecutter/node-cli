import co from 'co';
import path from 'path';
import {expect} from 'chai';
import {initialize, cleanup} from '../../../../helpers/temp-fixture';
import configFile from '../../../../../../src/cli/lib/util/config-file';

const home = process.env[
  (process.platform === 'win32') ? 'USERPROFILE' : 'HOME'
];
const cwd = process.cwd();
const homeConfigFile = path.join(home, '.{{cookiecutter.project_name}}.js');
const cwdConfigFile = path.join(cwd, '.{{cookiecutter.project_name}}.js');
const otherConfigFile = 'other-config.js';

describe('cli', () => {
  describe('lib', () => {
    describe('util', () => {
      describe('#configFile', () => {
        afterEach(() => {
          cleanup();
        });

        describe('when a passed in path does not exist', () => {
          it('should throw an error', () => {
            return co(function* () {
              yield configFile(otherConfigFile);
            }).should.be.rejectedWith('ENOENT');
          });
        });

        describe('when no config file is found', () => {
          beforeEach(() => {
            return initialize(path.join('config-file', 'no-config'));
          });

          it('should return undefined', () => {
            return co(function* () {
              const file = yield configFile();
              expect(file).to.be.undefined;
            });
          });

          it('should return a passed in path', () => {
            return co(function* () {
              const file = yield configFile(otherConfigFile);
              file.should.eql(otherConfigFile);
            });
          });
        });

        describe('when a config file is found in the home directory', () => {
          beforeEach(() => {
            return initialize(
              path.join('config-file', 'home-config')
            );
          });

          it('should return the path to the config file', () => {
            return co(function* () {
              const file = yield configFile();
              file.should.eql(homeConfigFile);
            });
          });

          it('should return a passed in path', () => {
            return co(function* () {
              const file = yield configFile(otherConfigFile);
              file.should.eql(otherConfigFile);
            });
          });
        });

        describe('when a config file is found in the current directory', () => {
          beforeEach(() => {
            return initialize(path.join('config-file', 'cwd-config'));
          });

          it('should return the path to the config file', () => {
            return co(function* () {
              const file = yield configFile();
              file.should.eql(cwdConfigFile);
            });
          });

          it('should return a passed in path', () => {
            return co(function* () {
              const file = yield configFile(otherConfigFile);
              file.should.eql(otherConfigFile);
            });
          });
        });
      });
    });
  });
});
