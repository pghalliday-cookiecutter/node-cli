'use strict';

class Logger {
  constructor(params) {
    Logger.instance = this;
    this.params = params;
    this.transports = {
      console: {},
    };
  }

  info() {
  }

  debug() {
  }
}

class Console {
  constructor() {
    this.type = 'console';
  }
}

module.exports = {
  Logger: Logger,
  config: {
    cli: {
      levels: 'levels',
    },
  },
  transports: {
    Console: Console,
  },
};
