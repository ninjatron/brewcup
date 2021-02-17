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
    region: {
      type: String,
      default: ""
    },
    estate: {
      type: String,
      default: ""
    },
    isAvailable: {
      type: Boolean,
      default: false
    },
    flavor: {
      type: String,
      default: "",
    },
    leaf: {
      type: String,
      default: ""
    },
    brewColor: {
      String,
      default: ""
    },
    score: {
      type: Number,
      default: 0
    },
    scoredBy: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Tea = mongoose.model('Tea', TeaSchema);

module.exports = Tea;