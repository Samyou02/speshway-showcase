const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  resume: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String
  },
  type: {
    type: String,
    enum: ['contact', 'resume', 'message'],
    default: 'contact'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  },
  replies: [{
    message: {
      type: String,
      required: true,
      trim: true
    },
    repliedBy: {
      type: String,
      required: true
    },
    repliedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);