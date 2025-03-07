let _instance: Validator | null = null;

class Validator {
  constructor() {
    if (_instance) {
      return _instance;
    }

    _instance = this;
  }

  getInstance() {
    return this;
  }

  validate(regex: RegExp, value: string, message: string) {
    return regex.test(value) || message;
  }

  validateEmail(value: string, message: string) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return this.validate(regex, value, message);
  }

  validatePassword(value: string, message: string) {
    const regex = /^[A-Za-z\d!@#$%^&*]{8,15}$/;

    return this.validate(regex, value, message);
  }
}

const validator = Object.freeze(new Validator());

export default validator;
