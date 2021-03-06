const { validationResult } = require('express-validator');
const Review = require('../models/review');
const Tea = require('../models/tea');
const User = require('../models/user');
const authToken = require('../middlewares/authToken');
// collection operations

// return a user's all reviews
const getUsersReviews = (req, res, next) => {
  const userId = req.userId;
  Review.find({"author": userId})
    .then(reviews => {
      res.status(200).json({
        message: "Retrieved user reviews",
        reviews: reviews
      })
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    })
};

// get all reviews belonging to a product
const getProductReviews = (req, res, next) => {
  const productId = req.params.productId;
  Tea.findById(productId)
    .then(tea => {
      res.status(200).json({
        message: "Product reviews",
        reviews: tea.reviews
      });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 404;
      next(err);
    })
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
  console.log(req);
  if (!errors.isEmpty()) {
    const error = new Error("Failed to add review");
    error.statusCode = 422;
    next(err);
  }

  Tea.findById(req.body.productId)
    .then(tea => {
      return tea.reviewedBy.find(elem => elem == req.body.userId);
    })
    .then(reviewedBy => {
      if (reviewedBy) {
        res.status(401).json({
          message: "Multiple reviews of the same product is not allowed",
        });
      } else {
        const score = req.body.score;
        let reviewer;
        let reviewedTea;
        
        const newReview = new Review({
          title: req.body.title,
          content: req.body.content,
          score: req.body.score,
          author: req.body.userId,
          product: req.body.productId
        });
      
        newReview.save()
          .then(review => {
            return User.findById(req.body.userId);
          })
          .then(user => {
            reviewer = user;
            user.reviews.push(newReview);
            return user.save();
          })
          .then(nextVal => {
            return Tea.findById(req.body.productId);
          })
          .then(teaToUpdate => {
            if (score > 0) {  
              const aggregateScore = (teaToUpdate.score * teaToUpdate.scoredBy) + score;
              teaToUpdate.scoredBy += 1;
              const newScore = aggregateScore / teaToUpdate.scoredBy;
              teaToUpdate.score = newScore;
            }
            teaToUpdate.reviewCount += 1;
            reviewedTea = teaToUpdate;
            teaToUpdate.reviewedBy.push(req.body.userId);
            teaToUpdate.reviews.push(newReview);
            return teaToUpdate.save();
          })
          .then(review => {
            res.status(200).json({ 
              message: "Review is added.", 
              review: review,
              author: reviewer
            });
          }).catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      next(err);
    });
};

// add update score later, probably need to add a utility function
// or not, do we want score to be updated later, maybe content change is enough
const updateReview = (req, res, next) => {
  const reviewId = req.body.reviewId;
  
  if (req.body.author !== req.userId) {
    const error = new Error("Not authorized");
    error.statusCode = 403;
    throw error;
  }

  Review.findOne({_id: reviewId})
    .then(review => {
      review.content = req.body.content;
      review.save();
      res.status(200).json({
        message: "Review updated.",
        review: review
      });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// make sure to delete references as well
const deleteReview = (req, res, next) => {
  const reviewId = req.body.reviewId;
  Review.findOneAndDelete(reviewId)
    .then(step => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.reviews.pull(reviewId);
      user.save();
      return Tea.findById(req.params.teaId);
    })
    .then(tea => {
      tea.reviews.pull(reviewId);
      tea.reviewedBy.pull(req.userId);
      return tea.save();
    })
    .then(result => {
      res.status(200).json({ message: "Review deleted." });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    })
};

module.exports = {
  getUsersReviews,
  getProductReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
};