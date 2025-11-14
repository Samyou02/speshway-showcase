const mongoose = require('mongoose');

const homeImageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
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
homeImageSchema.index({ isActive: 1, order: 1 });
homeImageSchema.index({ createdAt: -1 });

// Pre-save middleware to ensure order is set if not provided
homeImageSchema.pre('save', function(next) {
  if (this.isNew && this.order === 0) {
    // Set order to current timestamp for new items
    this.order = Date.now();
  }
  next();
});

const HomeImage = mongoose.model('HomeImage', homeImageSchema);

module.exports = HomeImage;

