import CommandGroup from './lib/command-group';

export default class {{cookiecutter.class_name}} extends CommandGroup {
  constructor() {
    super();
    this
    .command('sub', 'Example command');
  }
}
