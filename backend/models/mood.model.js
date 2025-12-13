const mongoose = require('mongoose');

const allowedMoods = ['😊', '😐', '😔', '😟', '😌'];

const MoodSchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      enum: allowedMoods,
      required: true
    },
    sessionId: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Mood', MoodSchema);
