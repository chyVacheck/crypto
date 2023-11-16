// ! modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// * errors
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
} = require('../errors/AllErrors');

// * models
const admin = require('../models/Admin');
const user = require('../models/User');

// * utils
// ? constants
const { SERVER_SETTING, MESSAGE, STATUS, DEV } = require('../utils/constants');

class Admins {
  constructor(data) {
    this.jwt_secret = data.jwt_secret;
    this.cookie_setting = data.cookie_setting;
  }

  // * GET
  // ? возвращает текущего администратора по _id
  getInfo = (req, res, next) => {
    const { _id, isAdmin } = req.user;

    if (!isAdmin) {
      return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.MUST_BE_ADMIN));
    }

    admin
      .findById(_id)
      .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.ADMIN))
      .then((adminMe) => res.send({ data: adminMe }))
      .catch(next);
  };

  // ? возвращает всех пользователей
  getAllUser = (req, res, next) => {
    const { _id, isAdmin } = req.user;

    if (!isAdmin) {
      return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.MUST_BE_ADMIN));
    }

    user
      .find()
      .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.USERS))
      .then((users) => res.send({ data: users }))
      .catch(next);
  };

  // ? возвращает всех пользователей
  getUserById = (req, res, next) => {
    const { _id, isAdmin } = req.user;
    const { userId } = req.params;

    if (!isAdmin) {
      return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.MUST_BE_ADMIN));
    }

    user
      .findById(userId)
      .orFail(() => new NotFoundError(MESSAGE.ERROR.NOT_FOUND.USER))
      .then((user) => res.send({ data: user }))
      .catch(next);
  };

  // * POST
  // ? создает пользователя
  createOne = async (req, res, next) => {
    const { isAdmin } = req.user;
    const { login, email, password } = req.body;

    // проверка на права доступа
    if (!isAdmin) {
      return next(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.MUST_BE_ADMIN));
    }

    // проверка на уникальность почты
    const isEmailUnique = await admin
      .findOne({ email: email })
      .then(async (adminData) => {
        if (adminData && adminData.email) {
          return false;
        }
        return true;
      });

    if (!isEmailUnique) {
      return next(new ConflictError(MESSAGE.ERROR.DUPLICATE.ADMIN));
    }

    bcrypt
      .hash(password, 10)
      .then(async (hash) => {
        await admin
          .create({
            login: login,
            email: email,
            password: hash,
          })
          .then(async (adminData) => {
            if (DEV) {
              res.status(STATUS.INFO.CREATED).send({
                message: MESSAGE.INFO.CREATED.ADMIN,
                data: adminData,
              });
            } else {
              res.status(STATUS.INFO.CREATED).send({
                message: MESSAGE.INFO.CREATED.ADMIN,
                data: {
                  login: adminData.login,
                  email: adminData.email,
                  _id: adminData._id,
                },
              });
            }
          });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(MESSAGE.ERROR.INCORRECT_DATA.SIMPLE));
        } else if (err.code === 11000) {
          console.log(err);
          next(new ConflictError(MESSAGE.ERROR.DUPLICATE.SIMPLE));
        } else {
          next(err);
        }
      });
  };

  // ? создание токена
  _createToken = (data) => jwt.sign(data, this.jwt_secret);

  // ? авторизация пользователя
  login = (req, res, next) => {
    const { login, password } = req.body;
    return admin
      .findAdminByCredentials(login, password)
      .then((data) => {
        const { _id } = data;
        const token = this._createToken({ _id: _id, isAdmin: true });

        res.cookie('jwt', token, this.cookie_setting);
        res.send({ message: MESSAGE.INFO.LOGIN });
      })
      .catch((err) => {
        next(err);
      });
  };
}

const admins = new Admins({
  jwt_secret: SERVER_SETTING.JWT_SECRET,
  cookie_setting: {
    expires: new Date(Date.now() + 12 * 3600000),
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  },
});

module.exports = { admins };
