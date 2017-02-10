import {{cookiecutter.class_name}} from '../../../src/{{cookiecutter.project_name}}.js';

describe('{{cookiecutter.class_name}}', () => {
  describe('#sub', () => {
    it('should return the text', () => {
      const instance = new {{cookiecutter.class_name}}();
      instance.sub('hello world').should.eql('hello world');
    });
  });
});
