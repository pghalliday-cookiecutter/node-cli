const binaries = {
  '{{cookiecutter.project_name}}': {
    'sub': /^ {2}Example command$/m,
  },
};

import _ from 'lodash';
import path from 'path';
import packageJson from '../../package.json';
import promisify from '../../src/helpers/promisify';
import {exec as _exec} from 'child_process';
import chai from 'chai';
chai.should();

const exec = promisify(_exec);

const binDir = path.resolve(path.join(
  __dirname,
  '..',
  '..',
  'bin'
));

function addTests(binaries, parents) {
  const binMap = {};
  _.forOwn(binaries, (helpRegex, binary) => {
    const components = parents.concat(binary);
    const fullname = components.join('-');
    const command = path.join(binDir, components.join(' '));
    binMap[fullname] = `./bin/${fullname}`;

    describe(binary, () => {
      if (helpRegex instanceof RegExp) {
        it('should output the correct help message', function* () {
          let stdout;
          let stderr;
          [stdout, stderr] = yield exec(`${command} --help`);
          stderr.should.eql('');
          stdout.should.match(helpRegex);
        });
      } else {
        Object.assign(binMap, addTests(helpRegex, components));
      }
    });
  });
  return binMap;
}

describe('e2e', () => {
  const binMap = addTests(binaries, []);

  describe('package.json', () => {
    it('should export only and all tested binaries', () => {
      binMap.should.eql(packageJson.bin);
    });
  });
});
