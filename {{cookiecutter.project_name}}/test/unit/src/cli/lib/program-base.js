import packageJson from '../../../../../package.json';
import {Command} from '../../../helpers/commander';
import ProgramBase from '../../../../../src/cli/lib/program-base';

describe('cli', () => {
  describe('lib', () => {
    describe('ProgramBase', () => {
      const programBase = new ProgramBase();

      it('should be an instance of Command', () => {
        programBase.should.be.an.instanceOf(Command);
      });

      it('should set the program version', () => {
        programBase.version.should.eql(packageJson.version);
      });
    });
  });
});
