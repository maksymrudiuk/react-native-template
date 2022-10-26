import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import * as Yup from 'yup';

class BaseValidator {
  constructor(props) {
    const { required = true } = props || {};
    this.required = required;
  }

  get schema() {
    return this.getSchema();
  }

  get messages() {
    return this.getMessages();
  }

  getMessages() {
    return {};
  }

  getMessage(key, ctx = {}) {
    const message = this.messages[key];

    if (!message) {
      throw new Error('Message Key Error');
    }

    if (isFunction(message)) {
      return message(ctx);
    }

    if (isString(message)) {
      return message;
    }

    throw new Error('Message Type Error');
  }

  getSchema() {
    throw new Error('Not Implemented Error');
  }
}

class EmailValidator extends BaseValidator {
  getMessages() {
    return {
      email: 'Please provider valid email address',
      required: 'Email is required',
    };
  }

  getSchema() {
    return this.required
      ? Yup.string().email(this.getMessage('email')).required(this.getMessage('required'))
      : Yup.string().email(this.getMessage('email'));
  }
}

class PasswordValidator extends BaseValidator {
  constructor(params) {
    const { min = 8, ...restParams } = params || {};
    super(restParams);
    this.min = min;
  }

  getMessages() {
    return {
      min: ({ value }) => `Password should have minumum ${value} symbols`,
      required: 'Password is required',
    };
  }

  getSchema() {
    return this.required
      ? Yup.string()
          .required(this.getMessage('required'))
          .min(this.min, this.getMessage('min', { value: this.min }))
      : Yup.string().min(this.min, this.getMessage('min', { value: this.min }));
  }
}

function createValidator(base, params) {
  return new base(params).schema;
}

export { EmailValidator, PasswordValidator, createValidator };
