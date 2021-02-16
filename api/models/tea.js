const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teaType: {
      type: String,
      required: true
    },
    packaging: {
      type: String,
      required: true
    },
    favoriteCount: {
      type: Number,
      default: 0
    },
    favoritedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      }
    ],
    reviewCount: {
      type: Number,
      default: 0
    },
    reviewedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    region: String,
    estate: String,
    isAvailable: Boolean,
    flavor: String,
    leaf: String,
    brewColor: String,
    score: Number,
    scoredBy: Number
  },
  {
    timestamps: true,
  }
);

const Tea = mongoose.model('Tea', TeaSchema);

module.exports = Tea;