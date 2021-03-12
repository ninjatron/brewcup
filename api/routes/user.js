const express = require('express');
const validator = require('express-validator');

const authToken = require('../middlewares/authToken');

const router = express.Router();
// controllers
const userController = require('../controllers/user');
const { uploadAvatar } = require("../services/imageUploader");

// GET all users from /users/get
router.get('/users', userController.getAllUsers);

// GET a single user from /user/get 
router.get('/user/:userId', userController.getUser);
// POST a single user to /user/post -> USELESS
// router.post('/user', userController.postUser);
// PATCH a single user to /user/patch
router.put('/user/:userId', authToken, userController.updateUser);
// avatar upload
router.put('/user/:userId/avatar', [authToken, uploadAvatar.single('avatar')], userController.uploadUserAvatar);
// DELETE a single user to /user/delete
router.delete('/user/:userId', authToken, userController.deleteUser);

module.exports = router;