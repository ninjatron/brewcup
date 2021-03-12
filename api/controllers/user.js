const { validationResult } = require('express-validator');
const uploadImage = require('../services/imageUploader');

const uploadAvatar = uploadImage.single('avatar');

const Tea = require('../models/tea');
const User = require('../models/user');

// collection operations
const getAllUsers = (req, res, next) => {
  res.status(200).json({
    users: []
  });
};


// single identity operations
const getUser = (req, res, next) => {
  console.log(req);
  const userId = req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('No id provided');
    error.statusCode = 404;
    next(err);
  }

  User.findById(userId)
    .then(user => {
      res.status(200).json({
        message: 'User retrieved',
        user: user
      });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// const postUser isn't really useful, we create in auth

const updateUser = (req, res, next) => {
  console.log(req);
  const errors = validationResult(req);
  const userId = req.body.userId;
  User.findById(userId)
    .then(res => {
      res.status(204).json({
        user: user
      });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });  
};

const deleteUser = (req, res, next) => {
  res.status(204).json({
    user: {

    }
  })
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers
};
