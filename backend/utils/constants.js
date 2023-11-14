// ! modules
require('dotenv').config();
const validator = require('validator');

// ! config.json
const config = require('./../config/config.json');

const {
  PORT = config.PORT,
  URL = config.URL,
  DB_ADDRESS = config.DB_ADDRESS,
  JWT_SECRET = config.jwt_secret,
  EMAIL_SERVICE = config.ALL_EMAILS.SERVICE,
  EMAIL_SUPPORT_EMAIL = config.ALL_EMAILS.SUPPORT.EMAIL,
  EMAIL_SUPPORT_PASS = config.ALL_EMAILS.SUPPORT.PASS,
  EMAIL_SYSTEM_EMAIL = config.ALL_EMAILS.SYSTEM.EMAIL,
  EMAIL_SYSTEM_PASS = config.ALL_EMAILS.SYSTEM.PASS,
  EMAIL_COMPANY_EMAIL = config.ALL_EMAILS.COMPANY.EMAIL,
  EMAIL_COMPANY_PASS = config.ALL_EMAILS.COMPANY.PASS,
  STATUS_DEV = config.STATUS_DEV,
} = process.env;

const DEV = STATUS_DEV === 'true';

// ? настройки сервера
const SERVER_SETTING = {
  PORT: PORT,
  URL: URL,
  DB_ADDRESS: DB_ADDRESS,
  JWT_SECRET: JWT_SECRET,
};

// ? для ответов на запросы
const MESSAGE = {
  ERROR: {
    UPDATE_REQUEST: {
      SIMPLE: 'The request has already been accepted',
    },
    BAD_REQUEST: {
      SIMPLE: 'BAD REQUEST',
      EMAIL_CODE: 'Your code is wrong, try again',
      VERIFY_FAILED:
        'You entered the wrong code three times, mail verification rejected, try again.',
    },
    INCORRECT_DATA: {
      SIMPLE: 'Incorrect data entered',
    },
    FORBIDDEN: {
      SIMPLE: 'You are not allowed to do this operation',
      TIME_UP: 'Confirmation time is up, try get new code',
      MUST_BE_USER: 'You must be user',
    },
    NOT_FOUND: {
      SIMPLE: 'Not found',
      REQUEST: 'Request not found',
      USER: 'User not found',
      USERS: 'No user found',
      ROUTER: 'Router not found',
      ADMIN: 'Admin not found',
      EMAIL: 'To get started, get a verification code in the email',
      TEMPORARY_USER:
        'The registration time is up or you have entered the code incorrectly several times in a row',
    },
    NOT_AUTHORIZED: {
      SIMPLE: 'User is not authorized',
    },
    SERVER: {
      SIMPLE: 'SERVER ERROR',
    },
    PASS: {
      SIMPLE: 'Wrong password',
    },
    DUPLICATE: {
      SIMPLE: 'You can not use these parameters, try other ones',
      MAIL: 'You have not yet completed your last registration',
      USER: 'There is already a user with this mail',
    },
    VALIDATION: {
      SIMPLE: 'Validation error',
      EMAIL: 'Email validation error',
      URL: 'URL validation error',
    },
  },
  INFO: {
    CREATED: {
      SIMPLE: 'CREATED',
      REQUEST: 'Request has been created',
      DEPOSIT: 'Deposit has been created',
      USER: 'User has been created',
      MAIL: 'Email was successfully send to your mail address',
      ADMIN: 'Admin has been created',
    },
    POST: {
      SIMPLE: 'Was successful posted',
      TWO_FACTOR_ON: 'Two factor now is turn on',
      TWO_FACTOR_OFF: 'Two factor now is turn off',
    },
    DELETE: {
      SIMPLE: 'Deleted',
    },
    PUT: {
      SIMPLE: 'Was successful put',
    },
    PATCH: {
      SIMPLE: 'Info patched',
    },
    LOGOUT: 'You have successfully logged out',
    LOGIN: 'You have successfully logged in',
  },
};
const STATUS = {
  ERROR: {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER: 500,
  },
  INFO: {
    OK: 200,
    CREATED: 201,
  },
};

const VALID_VALUES = {
  ID_LENGTH: 24,
  TEXT: {
    LENGTH: {
      MIN: 2,
      MAX: 32,
    },
  },
  PASSWORD: {
    LENGTH: {
      MIN: 2,
      MAX: 32,
    },
  },
  EMAIL: {
    LENGTH: {
      MIN: 5,
    },
  },
  REGISTRATION_NUMBER: {
    LENGTH: {
      MIN: 1, // TODO
      MAX: 20,
    },
  },
  ZIP_CODE: {
    LENGTH: {
      MIN: 1, // TODO
      MAX: 6,
    },
  },
  LEGAL_FORM: {
    POSSIBLE_ANSWERS: [
      'Limited Liability Company',
      'Self Employed',
      'Individual trader',
      'General Partnership',
      'Limited partnership',
      'Society',
      'Government LLC',
      'Foundation',
      'Other',
    ],
  },
  VAT_NUMBER: {
    LENGTH: {
      MIN: 1, // TODO
      MAX: 20,
    },
  },
  SHARE_HOLDER: {
    POSSIBLE_ANSWERS: ['Individual', 'Company'],
  },
};

const EMAILS = {
  SERVICE: EMAIL_SERVICE,
  SUPPORT: {
    EMAIL: EMAIL_SUPPORT_EMAIL,
    PASS: EMAIL_SUPPORT_PASS,
  },
  SYSTEM: {
    EMAIL: EMAIL_SYSTEM_EMAIL,
    PASS: EMAIL_SYSTEM_PASS,
  },
  COMPANY: {
    EMAIL: EMAIL_COMPANY_EMAIL,
    PASS: EMAIL_COMPANY_PASS,
  },
};

const isThisURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error(MESSAGE.ERROR.VALIDATION.URL);
};

// * экспорт всех констант
module.exports = {
  SERVER_SETTING,
  MESSAGE,
  STATUS,
  VALID_VALUES,
  EMAILS,
  isThisURL,
  DEV,
};
