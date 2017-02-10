import CommandGroup from '../../../../../src/cli/lib/command-group';
import ProgramBase from '../../../../../src/cli/lib/program-base';

describe('cli', () => {
  describe('lib', () => {
    describe('CommandGroup', () => {
      let commandGroup;
      beforeEach(() => {
        commandGroup = new CommandGroup();
      });

      it('should be an instance of ProgramBase', () => {
        commandGroup.should.be.an.instanceOf(ProgramBase);
      });

      describe('#parse', () => {
        beforeEach(() => {
          commandGroup
          .command('command1', 'description1')
          .command('command2', 'description2');
        });

        it('should parse the arguments', () => {
          commandGroup.parse([
            'command1',
            'subcommand',
          ]);
          commandGroup.args.should.eql([
            'command1',
            'subcommand',
          ]);
        });

        it('should throw an error for unknown sub commands', () => {
          (() => {
            commandGroup.parse([
              'command3',
              'subcommand',
            ]);
          }).should.throw('Unknown sub command: command3');
        });
      });
    });
  });
});
