# {{cookiecutter.project_name}}

[![Build Status](https://travis-ci.org/{{cookiecutter.github_username}}/{{cookiecutter.project_name}}.svg?branch=master)](https://travis-ci.org/{{cookiecutter.github_username}}/{{cookiecutter.project_name}})
[![Coverage Status](https://coveralls.io/repos/github/{{cookiecutter.github_username}}/{{cookiecutter.project_name}}/badge.svg?branch=master)](https://coveralls.io/github/{{cookiecutter.github_username}}/{{cookiecutter.project_name}}?branch=master)

{{cookiecutter.description}}

## npm scripts

- `npm run unit-test` - lint and unit test
- `npm run build` - run tests then build
- `npm test` - build then run integration tests
- `npm run watch` - watch for changes and run tests
- `npm run ci` - run tests and submit coverage to coveralls
