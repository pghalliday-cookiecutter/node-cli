import {{cookiecutter.class_name}} from '../../../../src/cli/{{cookiecutter.project_name}}';
import CommandGroup from '../../../../src/cli/lib/command-group';

describe('cli', () => {
  describe('{{cookiecutter.class_name}}', () => {
    let instance;
    beforeEach(() => {
      instance = new {{cookiecutter.class_name}}();
    });

    it('should be an instance of CommandGroup', () => {
      instance.should.be.an.instanceOf(CommandGroup);
    });

    it('should implement the NCB sub commands', () => {
      instance.commands.should.eql([
        {_name: 'sub', description: 'Example command'},
      ]);
    });
  });
});
