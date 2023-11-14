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

Validator.signout = celebrate({
  body: Joi.object().keys({}),
});

module.exports = Validator;
