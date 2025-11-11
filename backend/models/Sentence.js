const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userAgent: {
    type: String,
    default: ''
  },
  recordedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sentence', sentenceSchema);
