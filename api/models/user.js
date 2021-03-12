const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tea'
      }
    ],
    addedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tea'
      }
    ],
    fullname: String,
    location: String,
    avatarUrl: String,
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);


const User = mongoose.model('User', UserSchema);

module.exports = User;