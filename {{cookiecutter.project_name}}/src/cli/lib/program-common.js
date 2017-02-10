import constants from '../../constants';
import ProgramBase from './program-base';
import configFile from './util/config-file';
import Config from './util/config';
import mapOptions from './util/map-options';
import winston from 'winston';
import {{cookiecutter.class_name}} from '../../{{cookiecutter.project_name}}';

const Logger = winston.Logger;

export default class ProgramCommon extends ProgramBase {
  constructor() {
    super();
    this
    .option(
      '--logLevel <level>',
      `the log level [${constants.DEFAULT_LOG_LEVEL}]`
    )
    .option(
      '-c, --config <path>',
      'path to a global configuration file containing default options'
    );
    this.logger = new Logger({
      levels: winston.config.cli.levels,
      transports: [
        new (winston.transports.Console)(),
      ],
    });
  }

  initInstance() {
    this.instance = new {{cookiecutter.class_name}}(this.config);
    this.instance.on('log', (event) => {
      this.logger[event.level](event.message);
    });
  }

  * parse(argv) {
    super.parse(argv);
    const configPath = yield configFile(this.config);
    this.config = yield new Config().load(configPath);
    mapOptions(this.config, this, {
      logLevel: 'logLevel',
    });
    this.logger.transports.console.level = this.config.logLevel;
  }
}
