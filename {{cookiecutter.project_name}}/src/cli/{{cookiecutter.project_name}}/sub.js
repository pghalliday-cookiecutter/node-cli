import ProgramCommon from '../lib/program-common';
import {assert} from '../lib/util/utils';

export default class Sub extends ProgramCommon {
  constructor() {
    super();
    this
    .arguments('<text>')
    .action((text) => {
      this.text = text;
    })
    .description('Example command');
  }

  * parse(argv) {
    yield super.parse(argv);
    assert(this.text, 'Text must be specified');
    // TODO: map more options here before initialising the library
    this.initInstance();
    process.stdout.write(this.instance.sub(this.text));
  }
}
