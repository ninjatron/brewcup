const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const authToken = require('../middlewares/authToken');

const router = express.Router();

router.put('/signup', [
  body('email')
    .isEmail().withMessage('Missing valid email')
    .custom((value, { req }) => {
      // if email exists in the DB reject
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject('E-mail is already registered.');
        }
      });
    }).
    normalizeEmail(),
  body('password').trim().isLength({ min: 8 }),
  body('username').trim().notEmpty(),
  body('username').trim()
    .custom((value, { req }) => {
      // reject if username is taken
      return User.findOne({ username: value }).then(user => {
        if (user) {
          return Promise.reject('Username has been taken.');
        }
      })
    }),
], authController.signup);

router.post('/login', authController.login);

module.exports = router;
