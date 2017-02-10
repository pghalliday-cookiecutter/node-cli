const OPTION_NAME_REGEX = /--([^ ]*)/;
const MULTI_ARG_REGEX = /^\[[^.]*\.\.\.]$/;

class Command {
  constructor() {
    this.commands = [];
    this.options = [];
  }

  parse(args) {
    this.args = args;
    this.options.forEach((option) => {
      const match = option._name.match(OPTION_NAME_REGEX);
      if (match && args[match[1]]) {
        if (option.callback) {
          this[match[1]] = option.defValue;
          args[match[1]].forEach((arg) => {
            this[match[1]] = option.callback(arg, this[match[1]]);
          });
        } else {
          this[match[1]] = args[match[1]];
        }
      }
    });
    if (this.callback) {
      const actualArgs = args.arguments || [];
      if (this.arguments.match(MULTI_ARG_REGEX)) {
        this.callback(actualArgs);
      } else {
        this.callback(...actualArgs);
      }
    }
  }

  command(name, description) {
    this.commands.push({
      _name: name,
      description: description,
    });
    return this;
  }

  option(name, description, callback, defValue) {
    const option = {
      _name: name,
      description: description,
    };
    if (callback) option.callback = callback;
    if (defValue) option.defValue = defValue;
    this.options.push(option);
    return this;
  }

  arguments(args) {
    this.arguments = args;
    return this;
  }

  action(callback) {
    this.callback = callback;
    return this;
  }

  description(description) {
    this.description = description;
    return this;
  }

  version(version) {
    this.version = version;
    return this;
  }
}

module.exports = {
  Command: Command,
};
