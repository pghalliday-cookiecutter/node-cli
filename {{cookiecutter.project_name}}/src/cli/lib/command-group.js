import _ from 'lodash';
import ProgramBase from './program-base';

export default class CommandGroup extends ProgramBase {
  parse(argv) {
    super.parse(argv);
    const subCmd = _.head(this.args);
    const cmds = _.map(this.commands, '_name');
    if (!_.includes(cmds, subCmd)) {
      throw new Error(`Unknown sub command: ${subCmd}`);
    }
  }
}
