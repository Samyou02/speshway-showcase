const express = require('express');
const router = express.Router();
const {
  getHomeBanners,
  getHomeBanner,
  createHomeBanner,
  updateHomeBanner,
  deleteHomeBanner,
} = require('../controllers/homeBannerController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const { createCloudinaryStorage } = require('../config/cloudinary');

const uploadHomeBanner = multer({
  storage: createCloudinaryStorage('speshway/home'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
  },
});
router.get('/', getHomeBanners);
router.get('/:id', getHomeBanner);
router.post('/', protect, admin, uploadHomeBanner.single('image'), createHomeBanner);
router.put('/:id', protect, admin, uploadHomeBanner.single('image'), updateHomeBanner);
router.delete('/:id', protect, admin, deleteHomeBanner);

module.exports = router;