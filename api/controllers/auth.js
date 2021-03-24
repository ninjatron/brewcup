const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const User = require('../models/user');

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode =  422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const newUser = new User({
        email: email,
        password: hashedPassword,
        username: username
      });
      return newUser.save();
    })
    .then(user => {
      const token = jwt.sign({ 
        username: user.username, userId: user._id.toString()}, 
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES }
      );

      res.status(201).json({ 
        message: 'User created', 
        user: user._id.toString(),
        token: token,
      });  
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    })
};

const login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let foundUser;

  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 401;
        throw error;
      }
      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(passwordMatch => {
      if (!passwordMatch) {
        const error = new Error('Password is incorrect');
        error.statusCode = 402;
        throw error;
      } 

      const token = jwt.sign({ 
        username: foundUser.username, userId: foundUser._id.toString()}, 
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES }
      );
      
      // handle this better in future, this is fine but not great
      foundUser.password = undefined;
      console.log(foundUser);
      res.status(201).json({
        user: foundUser,
        token: token
      });
      // end of second then
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      throw err;
    });

}; // end of login

module.exports = {
  signup,
  login
};