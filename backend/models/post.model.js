const mongoose = require('mongoose');
const crypto = require('crypto');

const allowedTags = [
  'anxiety',
  'depression',
  'burnout',
  'stress',
  'loneliness',
  'grief',
  'self-esteem',
  'other'
];

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: true
    },
    content: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 2000,
      required: true
    },
    tags: {
      type: [String],
      validate: {
        validator: (tags) =>
          tags.every((tag) => allowedTags.includes(tag)),
        message: 'Invalid tag detected'
      },
      default: []
    },
    supportCount: {
      type: Number,
      default: 0,
      min: 0
    },
    anonymousToken: {
      type: String,
      required: true,
      index: true,
      select: false
    }
  },
  {
    timestamps: true
  }
);

// Generate anonymous edit/delete token
PostSchema.pre('validate', function (next) {
  if (!this.anonymousToken) {
    this.anonymousToken = crypto.randomBytes(24).toString('hex');
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
