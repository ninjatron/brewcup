const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema(
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
      ref: 'User'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Tea'
    },
    score: Number,
  },
  {
    timestamps: true,
  }
);