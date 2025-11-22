const mongoose = require('mongoose');

const HomeBannerSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HomeBanner', HomeBannerSchema);