import createBuffer from './buffer';

let originalWrite;
let data;

export function capture() {
  data = createBuffer(0);
  originalWrite = process.stdout.write;
  process.stdout.write = function(_data) {
    _data = createBuffer(_data);
    data = Buffer.concat([data, _data]);
  };
};

export function restore() {
  process.stdout.write = originalWrite;
  process.stdout.write(data);
};

export function flush() {
  const _data = data;
  data = createBuffer(0);
  return _data;
};
