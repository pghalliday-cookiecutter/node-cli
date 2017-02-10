import packageJson from '../../../package.json';
import {Command} from 'commander';

export default class ProgramBase extends Command {
  constructor() {
    super();
    this.version(packageJson.version);
  }
}
