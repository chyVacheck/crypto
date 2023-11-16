// ! modules
const User = require('express').Router();

// * controllers
// ? users
const { users } = require('../controllers/user');

// ? GET
// * получение данных о пользователе
User.get('/me', users.getInfo);

module.exports = User;
