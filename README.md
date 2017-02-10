# node-cli

Project template for NodeJS CLI applications

## Usage

First, create an empty (no README.md) project on [GitHub](https://github.com). You will need the GitHub user and project names when running the template.

Second, enable the project on [TravisCI](https://travis-ci.org) and [Coveralls](https://coveralls.io)

Then generate the project boilerplate...

```shell
cookiecutter https://github.com/pghalliday-cookiecutter/node.git
```

Then initialise a git repository and push it...

```shell
cd <project name>
git init
git remote add origin <github repository>
git add -A
git commit -m "boiler plate"
git push --set-upstream origin master
```
