// ! modules
const { Joi, celebrate } = require('celebrate');

// * utils
// ? constants
const { VALID_VALUES } = require('../utils/constants');

class Validator {}

Validator.signup = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(VALID_VALUES.TEXT.LENGTH.MIN)
      .max(VALID_VALUES.TEXT.LENGTH.MAX),
    secondName: Joi.string()
      .required()
      .min(VALID_VALUES.TEXT.LENGTH.MIN)
      .max(VALID_VALUES.TEXT.LENGTH.MAX),
    email: Joi.string().min(VALID_VALUES.EMAIL.LENGTH.MIN).required(),
    phone: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(VALID_VALUES.PASSWORD.LENGTH.MIN)
      .max(VALID_VALUES.PASSWORD.LENGTH.MAX),
  }),
});

Validator.verifyAndSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(VALID_VALUES.EMAIL.LENGTH.MIN).required(),
    code: Joi.string().required(),
  }),
});

Validator.signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(VALID_VALUES.EMAIL.LENGTH.MIN),
    password: Joi.string()
      .required()
      .min(VALID_VALUES.PASSWORD.LENGTH.MIN)
      .max(VALID_VALUES.PASSWORD.LENGTH.MAX),
  }),
});

Validator.adminSignin = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required().min(VALID_VALUES.TEXT.LENGTH.MIN),
    password: Joi.string()
      .required()
      .min(VALID_VALUES.PASSWORD.LENGTH.MIN)
      .max(VALID_VALUES.PASSWORD.LENGTH.MAX),
  }),
});

Validator.createOneAdmin = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required().min(VALID_VALUES.TEXT.LENGTH.MIN),
    email: Joi.string().min(VALID_VALUES.EMAIL.LENGTH.MIN),
    password: Joi.string()
      .required()
      .min(VALID_VALUES.PASSWORD.LENGTH.MIN)
      .max(VALID_VALUES.PASSWORD.LENGTH.MAX),
  }),
});

Validator.signout = celebrate({
  body: Joi.object().keys({}),
});

Validator.usersFile = celebrate({
  params: Joi.object().keys({
    typeOfFile: Joi.string()
      .valid(...VALID_VALUES.USER.FILE.VALUES)
      .required(),
  }),
});

Validator.userId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
  }),
});

Validator.userIdUsersFile = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
    typeOfFile: Joi.string()
      .valid(...VALID_VALUES.USER.FILE.VALUES)
      .required(),
  }),
});

Validator.patchUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(VALID_VALUES.TEXT.LENGTH.MIN)
      .max(VALID_VALUES.TEXT.LENGTH.MAX),
    secondName: Joi.string()
      .min(VALID_VALUES.TEXT.LENGTH.MIN)
      .max(VALID_VALUES.TEXT.LENGTH.MAX),
    phone: Joi.string(),
    password: Joi.string()
      .min(VALID_VALUES.PASSWORD.LENGTH.MIN)
      .max(VALID_VALUES.PASSWORD.LENGTH.MAX),
    typeOfUser: Joi.string().valid(...VALID_VALUES.USER.TYPE.VALUES),
  }),
});

module.exports = Validator;
