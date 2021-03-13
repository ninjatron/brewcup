const { validationResult } = require('express-validator');
const { deleteImages } = require('../services/imageUploader');

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
  // console.log(req);
  const userId = req.params.userId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('No id provided');
    error.statusCode = 404;
    next(err);
  }

  User.findById(userId)
    .select('-password')
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

const uploadUserAvatar = (req, res, next) => {
  // if prev avatar exists, delete it
  const userId = req.userId;
  User.findById(userId)
    .then(user => {
      if (user.avatarUrl && user.avatarUrl.length > 0) {
        // params bucket id, and avatar id; since delete images expects
        // an array for ids, we have to pass it in an array
        let avatarKey = user.avatarUrl.split('/').pop();
        deleteImages('brewandcup-media', [avatarKey]);
      }
      user.avatarUrl = req.file.location;
      user.save();
      res.status(200);
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
}

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
  getAllUsers,
  uploadUserAvatar
};
