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
  const userId = req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('No id provided');
    error.statusCode = 404;
    next(err);
  }

  User.find(userId)
    .then(user => {
      res.status(200).json({
        message: 'User retrieved',
        user: user
      });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    })
};

const postUser = (req, res, next) => {
  res.status(201).json({
    user: {

    }
  })
};

const putUser = (req, res, next) => {
  res.status(204).json({
    user: {

    }
  })
};

const deleteUser = (req, res, next) => {
  res.status(204).json({
    user: {

    }
  })
};

module.exports = {
  getUser,
  postUser,
  patchUser,
  deleteUser,
  getAllUsers
};
