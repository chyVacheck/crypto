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

// * получение данных о всех пользователях
Admin.get('/users', admins.getAllUser);

// * получение данных о пользователе по id
Admin.get('/users/:userId', admins.getUserById);

// ? POST
// * регистрация
Admin.post('/createOneAdmin', Validator.createOneAdmin, admins.createOne);

module.exports = Admin;
