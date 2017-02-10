import DSLLoader from '../../../../../../src/cli/lib/util/dsl-loader';
import DSLConfig from 'dsl-config';
import path from 'path';
import co from 'co';

const dslConfig = new DSLConfig()
.value('foo', 'bar')
.value('hello', 'world');

const FIXTURES = path.resolve(path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'fixtures',
  'dsl-loader'
));

const TEST_JSON = path.join(FIXTURES, 'test.json');
const TEST_OBJECT = path.join(FIXTURES, 'test-object.js');
const TEST_JS = path.join(FIXTURES, 'test.js');
const TEST_INVALID = path.join(FIXTURES, 'test-invalid.js');

describe('cli', () => {
  describe('lib', () => {
    describe('util', () => {
      describe('DSLLoader', () => {
        let dslLoader;

        describe('without a pathField specified', () => {
          beforeEach(() => {
            dslLoader = new DSLLoader(dslConfig);
          });

          it('should load defaults', () => {
            return co(function* () {
              return yield dslLoader.load();
            }).should.eventually.eql({
              foo: 'bar',
              hello: 'world',
            });
          });

          it('should load JSON files', () => {
            return co(function* () {
              return yield dslLoader.load(TEST_JSON);
            }).should.eventually.eql({
              foo: 'bar',
              hello: 'boo',
            });
          });

          it('should load object modules', () => {
            return co(function* () {
              return yield dslLoader.load(TEST_OBJECT);
            }).should.eventually.eql({
              foo: 'bar',
              hello: 'boo',
            });
          });

          it('should load callback modules', () => {
            return co(function* () {
              return yield dslLoader.load(TEST_JS);
            }).should.eventually.eql({
              foo: 'bar',
              hello: 'boo',
            });
          });

          it('should error with an invalid module', () => {
            return co(function* () {
              return yield dslLoader.load(TEST_INVALID);
            }).should.be.rejectedWith('Invalid exports');
          });
        });

        describe('with a pathField specified', () => {
          beforeEach(() => {
            dslLoader = new DSLLoader(dslConfig, {
              pathField: '_configPath',
            });
          });

          it('should load defaults', () => {
            return co(function* () {
              return yield dslLoader.load();
            }).should.eventually.eql({
              foo: 'bar',
              hello: 'world',
            });
          });

          it('should load JSON files', () => {
            return co(function* () {
              return yield dslLoader.load(TEST_JSON);
            }).should.eventually.eql({
              foo: 'bar',
              hello: 'boo',
              _configPath: TEST_JSON,
            });
          });

          it('should load object modules', () => {
            return co(function* () {
              return yield dslLoader.load(TEST_OBJECT);
            }).should.eventually.eql({
              foo: 'bar',
              hello: 'boo',
              _configPath: TEST_OBJECT,
            });
          });

          it('should load callback modules', () => {
            return co(function* () {
              return yield dslLoader.load(TEST_JS);
            }).should.eventually.eql({
              foo: 'bar',
              hello: 'boo',
              _configPath: TEST_JS,
            });
          });

          it('should error with an invalid module', () => {
            return co(function* () {
              return yield dslLoader.load(TEST_INVALID);
            }).should.be.rejectedWith('Invalid exports');
          });
        });
      });
    });
  });
});
