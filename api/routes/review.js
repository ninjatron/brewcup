const express = require('express');
const validator = require('express-validator');

const router = express.Router();
// controllers
const reviewController = require('../controllers/review');
// middlewares
const authToken = require('../middlewares/authToken');

// GET all users from /users/get
router.get('/tea/:teaId/reviews', reviewController.getProductReviews);

// GET all reviews of a single user from 
router.get('/user/:userId/reviews', reviewController.getUsersReviews);

// GET a single review from 
router.get('/user/:userId/reviews', reviewController.getReview);
// POST a review to a tea 
router.post('/tea/:teaId/reviews', authToken, reviewController.addReview);
// PATCH a review belonging a tea 
router.patch('/tea/:teaId/reviews', authToken, reviewController.updateReview);
// DELETE a review belonging to a tea
router.delete('/tea/:teaId/reviews', authToken, reviewController.deleteReview);

module.exports = router;