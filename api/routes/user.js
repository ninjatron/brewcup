const express = require('express');
const validator = require('express-validator');

const router = express.Router();
// controllers
const userController = require('../controllers/user');

// GET all users from /users/get
router.get('/users', userController.getAllUsers);

// GET a single user from /user/get 
router.get('/user/:userId', userController.getUser);
// POST a single user to /user/post
router.post('/user', userController.postUser);
// PATCH a single user to /user/patch
router.patch('/user/:userId', userController.patchUser);
// DELETE a single user to /user/delete
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;