// ! modules
const router = require('express').Router();

// api
const Auth = require('./auth');
const Admin = require('./admin');
const User = require('./user');

// * controllers
// ? auth
const { auth } = require('../controllers/auth');

// ? middlewares
const jwtCheck = require('../middlewares/Auth');
const Validator = require('./../middlewares/Validation');

// * utils
// ? constants
const { SERVER_SETTING } = require('../utils/constants');
// ? NotFound
const { NotFound } = require('../utils/NotFound');

router.use(`/${SERVER_SETTING.URL}/v1/auth`, Auth); // ? Auth

router.use(jwtCheck); // ? check cookie

router.delete(
  `/${SERVER_SETTING.URL}/v1/auth/signout`,
  Validator.signout,
  auth.signOut,
); // ? signout

router.use(`/${SERVER_SETTING.URL}/v1/admin`, Admin); // ? Admin

router.use(`/${SERVER_SETTING.URL}/v1/user`, User);

router.use(`*`, NotFound); // ? error 404 for another routers

module.exports = router;
