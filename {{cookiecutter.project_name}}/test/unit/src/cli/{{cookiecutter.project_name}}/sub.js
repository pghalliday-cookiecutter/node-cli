import co from 'co';
import Sub from '../../../../../src/cli/{{cookiecutter.project_name}}/sub';
import ProgramCommon from '../../../../../src/cli/lib/program-common';
import {capture, restore, flush} from '../../../helpers/stdout';
import createBuffer from '../../../helpers/buffer';

const TEST_ARGUMENT = 'test';
const TEST_BUFFER = createBuffer(TEST_ARGUMENT);

describe('cli', () => {
  describe('{{cookiecutter.project_name}}', () => {
    describe('Sub', () => {
      let sub;
      beforeEach(() => {
        sub = new Sub();
      });

      it('should be an instance of ProgramCommon', () => {
        sub.should.be.an.instanceOf(ProgramCommon);
      });

      it('should implement the sub arguments and description', () => {
        sub.arguments.should.eql('<text>');
        sub.description.should.eql(
          'Example command'
        );
      });

      describe('#parse', () => {
        beforeEach(() => {
          capture();
        });

        afterEach(() => {
          restore();
        });

        it('should throw an error if no text is specified', () => {
          return co(function* () {
            yield sub.parse({});
          }).should.be.rejectedWith('Text must be specified');
        });

        it('should log the text contents', () => {
          return co(function* () {
            yield sub.parse({
              arguments: [TEST_ARGUMENT],
            });
            flush().should.eql(TEST_BUFFER);
          });
        });
      });
    });
  });
});
