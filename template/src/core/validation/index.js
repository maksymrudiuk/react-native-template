function isBlob(value) {
  return (
    value &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.slice === 'function'
  );
}

function isFile(value, type = '') {
  const base =
    isBlob(value) &&
    typeof value.name === 'string' &&
    (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number');

  return type ? base && value.type.split('/')[0] === type : base;
}

function isPromise(value) {
  return value && Object.prototype.toString.call(value) === '[object Promise]';
}

export { isBlob, isFile, isPromise };
