import _ from 'lodash';

export function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
