const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Tea',
      required: true
    },
    score: Number,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;