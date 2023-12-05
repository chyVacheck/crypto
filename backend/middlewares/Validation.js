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

Validator.companyId = celebrate({
  params: Joi.object().keys({
    companyId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
  }),
});

Validator.companyIdShareholderId = celebrate({
  params: Joi.object().keys({
    companyId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
    shareholderId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
  }),
});

Validator.companyIdShareholderIdUpdate = celebrate({
  params: Joi.object().keys({
    companyId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
    shareholderId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
  }),
  body: Joi.object()
    .keys({
      // company
      name: Joi.string(),
      registrationNumber: Joi.string(),
      legalForm: Joi.string(),
      legalAddress: Joi.string(),
      city: Joi.string(),
      zipCode: Joi.string(),
      countryOfRegistration: Joi.string(),
      VAT: Joi.string(),
      registrationDate: Joi.string(),
      // individual
      fullName: Joi.string(),
      equityShare: Joi.string(),
      contactEmail: Joi.string(),
      jobTitle: Joi.string(),
      phoneNumber: Joi.string(),
    })
    .min(1)
    .required(),
});

Validator.companyIdShareholderIdFile = celebrate({
  params: Joi.object().keys({
    companyId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
    shareholderId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
    typeOfFile: Joi.string()
      .valid(...VALID_VALUES.SHARE_HOLDER.FILE.VALUES)
      .required(),
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

Validator.createCompany = celebrate({
  body: Joi.object().keys({
    registrationNumber: Joi.string().required(),
    shareholder: Joi.object()
      .required()
      .keys({
        typeOfShareholder: Joi.string()
          .required()
          .valid(...VALID_VALUES.SHARE_HOLDER.VALUES),
        data: Joi.when('typeOfShareholder', {
          is: 'company',
          then: Joi.object({
            name: Joi.string(),
            registrationNumber: Joi.string().required(),
            legalForm: Joi.string(),
            legalAddress: Joi.string(),
            city: Joi.string(),
            zipCode: Joi.string(),
            countryOfRegistration: Joi.string(),
            VAT: Joi.string(),
            registrationDate: Joi.string(),
          }),
          otherwise: Joi.object({
            fullName: Joi.string().required(),
            equityShare: Joi.string(),
            contactEmail: Joi.string(),
            jobTitle: Joi.string(),
            phoneNumber: Joi.string(),
          }),
        }).required(),
      }),
  }),
});

Validator.addShareholder = celebrate({
  params: Joi.object().keys({
    companyId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
  }),
  body: Joi.object().keys({
    typeOfShareholder: Joi.string()
      .required()
      .valid(...VALID_VALUES.SHARE_HOLDER.VALUES),
    data: Joi.when('typeOfShareholder', {
      is: 'company',
      then: Joi.object({
        name: Joi.string(),
        registrationNumber: Joi.string().required(),
        legalForm: Joi.string(),
        legalAddress: Joi.string(),
        city: Joi.string(),
        zipCode: Joi.string(),
        countryOfRegistration: Joi.string(),
        VAT: Joi.string(),
        registrationDate: Joi.string(),
      }),
      otherwise: Joi.object({
        fullName: Joi.string().required(),
        equityShare: Joi.string(),
        contactEmail: Joi.string(),
        jobTitle: Joi.string(),
        phoneNumber: Joi.string(),
      }),
    }).required(),
  }),
});

Validator.updateCompanyDataById = celebrate({
  params: Joi.object().keys({
    companyId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      legalAddress: Joi.string(),
      city: Joi.string(),
      zipCode: Joi.string(),
      legalForm: Joi.string().valid(...VALID_VALUES.LEGAL_FORM.VALUES),
      countryOfRegistration: Joi.string(),
      VAT: Joi.number()
        .min(VALID_VALUES.VAT_NUMBER.LENGTH.MIN)
        .max(VALID_VALUES.VAT_NUMBER.LENGTH.MAX),
      registrationDate: Joi.date(),
      bankAccount: {
        bankName: Joi.string(),
        bankCode: Joi.string(),
        IBAN: Joi.string(),
        accountHolderName: Joi.string(),
      },
    })
    .min(1)
    .required(),
});

Validator.companyIdCompanyFile = celebrate({
  params: Joi.object().keys({
    companyId: Joi.string().length(VALID_VALUES.ID_LENGTH).required(),
    typeOfFile: Joi.string()
      .valid(...VALID_VALUES.COMPANY.FILE.VALUES)
      .required(),
  }),
});

Validator.mail = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(VALID_VALUES.MAIL.TITLE.LENGTH.MIN),
    message: Joi.string().required().min(VALID_VALUES.MAIL.MESSAGE.LENGTH.MIN),
  }),
});

Validator.mailToCommunicate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(VALID_VALUES.TEXT.LENGTH.MIN),
    email: Joi.string().required().min(VALID_VALUES.EMAIL.LENGTH.MIN),
    message: Joi.string().required().min(VALID_VALUES.MAIL.MESSAGE.LENGTH.MIN),
  }),
});

module.exports = Validator;
