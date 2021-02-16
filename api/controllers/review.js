const { validationResult } = require('express-validator');
const Review = require('../models/review');
const Tea = require('../models/tea');
// collection operations

// return a user's all reviews
const getUsersReviews = (req, res, next) => {

};

// get all reviews belonging to a product
const getProductReviews = (req, res, next) => {

};

// single operations
const getReview = (req, res, next) => {
  const reviewId = req.params.reviewId;
  Review.findById(reviewId).then(review => {
    res.status(200).json({ review: review });
  }).catch(err => {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  });
};

const addReview = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Failed to get review");
    error.statusCode = 422;
    next(err);
  }

  const score = req.body.score;
  
  Tea.findById(teaId).then(tea => {
    if (score > 0) {  
      const aggregateScore = (tea.score * tea.scoredBy) + score;
      tea.scoredBy += 1;
      const newScore = aggregateScore / tea.scoredBy;
      tea.score = newScore;
    }
    tea.reviewCount += 1;
  }).catch(err => {
    console.log(err);
  });
  
  const newReview = new Review({
    title: req.body.title,
    content: req.body.content,
    score: req.body.score,
    author: req.body.author,
    product: req.body.product
  });

  newReview.save().then(review => {
    res.status(200).json({ 
      message: "Review is added.", 
      review: review 
    });
  }).catch(err => {
    console.log(err);
  })
};

const updateReview = (req, res, next) => {

};

const deleteReview = (req, res, next) => {

};

module.export = {
  getUsersReviews,
  getProductReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
};