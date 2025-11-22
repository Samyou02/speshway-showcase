const HomeBanner = require('../models/HomeBanner');
const { cloudinary } = require('../config/cloudinary');

const getHomeBanners = async (req, res) => {
  try {
    const { all } = req.query;
    const query = all === 'true' ? {} : { isActive: true };
    const banners = await HomeBanner.find(query).sort({ order: 1, createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHomeBanner = async (req, res) => {
  try {
    const banner = await HomeBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createHomeBanner = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image file is required' });
    const banner = new HomeBanner({
      title: req.body.title || '',
      image: { url: req.file.path, publicId: req.file.filename },
      order: req.body.order ? Number(req.body.order) : 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive === 'true' || req.body.isActive === true : true,
    });
    const created = await banner.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHomeBanner = async (req, res) => {
  try {
    const banner = await HomeBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    if (typeof req.body.title !== 'undefined') banner.title = req.body.title;
    if (typeof req.body.order !== 'undefined') banner.order = Number(req.body.order);
    if (typeof req.body.isActive !== 'undefined') banner.isActive = req.body.isActive === 'true' || req.body.isActive === true;

    if (req.file) {
      if (banner.image?.publicId) {
        try { await cloudinary.uploader.destroy(banner.image.publicId); } catch (e) {}
      }
      banner.image = { url: req.file.path, publicId: req.file.filename };
    }

    banner.updatedAt = Date.now();
    const updated = await banner.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteHomeBanner = async (req, res) => {
  try {
    const banner = await HomeBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    if (banner.image?.publicId) {
      try { await cloudinary.uploader.destroy(banner.image.publicId); } catch (e) {}
    }
    await banner.deleteOne();
    res.json({ message: 'Banner removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHomeBanners,
  getHomeBanner,
  createHomeBanner,
  updateHomeBanner,
  deleteHomeBanner,
};