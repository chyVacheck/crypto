// ! modules
const Admin = require('express').Router();

// * controllers
// ? users
const { admins } = require('../controllers/admin');

// * middlewares
// ? validation
const Validator = require('./../middlewares/Validation');

// ? GET
// * получение данных о администраторе
Admin.get('/me', admins.getInfo);

// ? POST
// * регистрация
Admin.post('/createOneAdmin', Validator.createOneAdmin, admins.createOne);

module.exports = Admin;
