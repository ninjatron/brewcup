const express = require('express');
const validator = require('express-validator');

const authToken = require('../middlewares/authToken');

const router = express.Router();
// controllers
const userController = require('../controllers/user');
const uploadImage = require("../services/imageUploader");

// GET all users from /users/get
router.get('/users', userController.getAllUsers);

// GET a single user from /user/get 
router.get('/user/:userId', userController.getUser);
// POST a single user to /user/post -> USELESS
// router.post('/user', userController.postUser);
// PATCH a single user to /user/patch
router.put('/user/:userId', [authToken, uploadImage.single('avatar')], userController.updateUser);
// DELETE a single user to /user/delete
router.delete('/user/:userId', authToken, userController.deleteUser);

module.exports = router;