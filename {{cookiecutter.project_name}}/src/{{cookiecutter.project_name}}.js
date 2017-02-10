import EventEmitter from 'events';

export default class {{cookiecutter.class_name}} extends EventEmitter {
  sub(text) {
    this.emit('log', {
      level: 'info',
      message: text,
    });
    return text;
  }
}
