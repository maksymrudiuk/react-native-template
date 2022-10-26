import {
  isUndefined,
  isNull,
  isArray,
  isObject,
  isDate,
  isBoolean,
  isString,
  isEmpty,
  isFunction,
} from 'lodash';

import { isBadRequest } from '../http/status';
import { isBlob, isFile } from '../validation';

function defaultErrorCallback(errors) {
  console.info(errors);
}

function processFormErrors(
  error,
  validationCallback = defaultErrorCallback,
  nonFieldErrorCallback = defaultErrorCallback,
  unexpectedErrorCallback = defaultErrorCallback,
) {
  if (isBadRequest(error.response)) {
    validationCallback(error.response.data, nonFieldErrorCallback);
  } else {
    unexpectedErrorCallback({
      key: 'unexpected',
      type: 'api',
      message: error.response?.data?.detail || null,
    });
  }
}

function objectToFormData(obj, config = {}, formData = null, key = '') {
  // Review config section
  config = config || {};
  config.indices = isUndefined(config.indices) ? false : config.indices;
  config.nullsAsUndefineds = isUndefined(config.nullsAsUndefineds)
    ? false
    : config.nullsAsUndefineds;
  config.booleansAsIntegers = isUndefined(config.booleansAsIntegers)
    ? false
    : config.booleansAsIntegers;
  config.allowEmptyArrays = isUndefined(config.allowEmptyArrays) ? false : config.allowEmptyArrays;
  config.adapters = isEmpty(config.adapters) ? {} : config.adapters;

  formData = formData || new FormData();

  // Undefined case
  if (isUndefined(obj)) {
    return formData;
  }

  // Null case
  if (isNull(obj)) {
    if (!config.nullsAsUndefineds) {
      formData.append(key, '');
    }
    // Boolan case
  } else if (isBoolean(obj)) {
    if (config.booleansAsIntegers) {
      formData.append(key, obj ? 1 : 0);
    } else {
      formData.append(key, obj);
    }
    // Array case
  } else if (isArray(obj)) {
    if (obj.length) {
      obj.forEach((value, index) => {
        const _key = isString(value) ? key : `${key}[${index}]`;
        objectToFormData(value, config, formData, _key);
      });
    } else if (config.allowEmptyArrays) {
      formData.append(key, '');
    }
    // Date case
  } else if (isDate(obj)) {
    formData.append(key, obj.toISOString());
    // Object/ !File/!Blob case.
  } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
    Object.keys(obj).forEach((prop) => {
      const value = obj[prop];

      if (prop in config.adapters && isFunction(config.adapters[prop])) {
        formData.append(prop, config.adapters[prop](value));
      } else {
        // Process nested array
        if (isArray(value)) {
          while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
            prop = `[${prop.substring(0, prop.length - 2)}]`;
          }
        }

        const _key = key
          ? key[key.length - 1] === ']'
            ? `${key}${prop}`
            : `${key}.${prop}`
          : prop;

        // Process object values
        objectToFormData(value, config, formData, _key);
      }
    });
    // Other cases
  } else {
    formData.append(key, obj);
  }

  return formData;
}

function logFormData(formData) {
  for (const pair of formData.entries()) {
    console.info(`${pair[0]}, ${pair[1]}`);
  }
}

export { processFormErrors, objectToFormData, logFormData };
