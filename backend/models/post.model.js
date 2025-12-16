const mongoose = require('mongoose');
const crypto = require('crypto');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000
    },
    anonymousToken: {
      type: String,
      required: true,
      index: true,
      default: () => crypto.randomUUID()
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
