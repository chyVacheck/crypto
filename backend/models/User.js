// ? modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// ? constants
const { VALID_VALUES, MESSAGE } = require('../utils/constants');

// * errors
const { BadRequestError, NotFoundError } = require('../errors/AllErrors');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: VALID_VALUES.TEXT.LENGTH.MAX,
      minlength: VALID_VALUES.TEXT.LENGTH.MIN,
    },
    secondName: {
      type: String,
      required: true,
      maxlength: VALID_VALUES.TEXT.LENGTH.MAX,
      minlength: VALID_VALUES.TEXT.LENGTH.MIN,
    },
    email: {
      type: String,
      required: true,
      minlength: VALID_VALUES.EMAIL.LENGTH.MIN,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passport: {
      data: Buffer,
      contentType: String,
    },
    proofOfAddress: {
      data: Buffer,
      contentType: String,
    },
    selfieWithIDOrPassport: {
      data: Buffer,
      contentType: String,
    },
  },
  { versionKey: false },
);

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.USER))
    .then((user) => {
      if (!user) {
        throw new NotAuthorized(MESSAGE.ERROR.NOT_AUTHORIZED.SIMPLE);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new BadRequestError(MESSAGE.ERROR.PASS.SIMPLE);
        }
        return user;
      });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);