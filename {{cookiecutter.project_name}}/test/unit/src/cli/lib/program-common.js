import co from 'co';
import path from 'path';
import {initialize, cleanup} from '../../../helpers/temp-fixture';
import ProgramCommon from '../../../../../src/cli/lib/program-common';
import ProgramBase from '../../../../../src/cli/lib/program-base';
import winston from '../../../helpers/winston';
import {{cookiecutter.class_name}} from '../../../../../src/{{cookiecutter.project_name}}';

const OVERRIDE_CONFIG_PATH = path.resolve('override.js');
const Logger = winston.Logger;

describe('cli', () => {
  describe('lib', () => {
    describe('ProgramCommon', () => {
      let programCommon;
      beforeEach(() => {
        programCommon = new ProgramCommon();
      });

      it('should be an instance of ProgramBase', () => {
        programCommon.should.be.an.instanceOf(ProgramBase);
      });

      it('should instantiate a default console logger', () => {
        Logger.instance.params.should.eql({
          levels: winston.config.cli.levels,
          transports: [
            new (winston.transports.Console)(),
          ],
        });
      });

      it('should implement the common options', () => {
        programCommon.options.should.eql([
          {_name: '--logLevel <level>', description: 'the log level [info]'},
          {
            _name: '-c, --config <path>',
            description:
              'path to a global configuration file containing default options',
          },
        ]);
      });

      describe('#parse', () => {
        describe('with no config', () => {
          it('should use default options', () => {
            return co(function* () {
              yield programCommon.parse({});
              Logger.instance.transports.console.level.should.eql('info');
            });
          });
        });

        describe('with discovered config', () => {
          beforeEach(() => {
            return initialize(path.join('program-common'));
          });

          afterEach(() => {
            cleanup();
          });

          it('should use the discovered options', () => {
            return co(function* () {
              yield programCommon.parse({});
              Logger.instance.transports.console.level.should.eql(
                'localLogLevel'
              );
            });
          });
        });

        describe('with specified config', () => {
          beforeEach(() => {
            return initialize(path.join('program-common'));
          });

          afterEach(() => {
            cleanup();
          });

          it('should use the specified options', () => {
            return co(function* () {
              yield programCommon.parse({
                config: OVERRIDE_CONFIG_PATH,
              });
              Logger.instance.transports.console.level.should.eql(
                'overrideLogLevel'
              );
            });
          });
        });

        describe('with specified options', () => {
          beforeEach(() => {
            return initialize(path.join('program-common'));
          });

          afterEach(() => {
            cleanup();
          });

          it('should use the specified options', () => {
            return co(function* () {
              yield programCommon.parse({
                config: OVERRIDE_CONFIG_PATH,
                logLevel: 'optionLogLevel',
              });
              Logger.instance.transports.console.level.should.eql(
                'optionLogLevel'
              );
            });
          });
        });
      });

      describe('#initInstance', () => {
        it('should initialize an {{cookiecutter.class_name}} instance', () => {
          return co(function* () {
            yield programCommon.parse({});
            programCommon.initInstance();
            programCommon.instance.should.be.an.instanceOf({{cookiecutter.class_name}});
          });
        });
      });
    });
  });
});
