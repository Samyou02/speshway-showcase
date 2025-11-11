const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  image: {
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  readMoreLink: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please enter a valid URL'
    }
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  order: {
    type: Number,
    default: 0,
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
gallerySchema.index({ category: 1, date: -1 });
gallerySchema.index({ isActive: 1, date: -1 });
gallerySchema.index({ createdAt: -1 });

// Virtual for formatted date
gallerySchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for short description
gallerySchema.virtual('shortDescription').get(function() {
  return this.description.length > 100 
    ? this.description.substring(0, 100) + '...' 
    : this.description;
});

// Pre-save middleware to ensure order is set if not provided
gallerySchema.pre('save', function(next) {
  if (this.isNew && this.order === 0) {
    // Set order to current timestamp for new items
    this.order = Date.now();
  }
  next();
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;