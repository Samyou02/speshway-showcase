const express = require('express');
const router = express.Router();
const {
  getHomeImages,
  getHomeImage,
  createHomeImage,
  updateHomeImage,
  deleteHomeImage
} = require('../controllers/homeImageController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const { createCloudinaryStorage } = require('../config/cloudinary');

// Configure multer for home images
const uploadHomeImage = multer({
  storage: createCloudinaryStorage('speshway/home-images'),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// Public routes
router.get('/', getHomeImages);
router.get('/:id', getHomeImage);

// Admin routes (protected)
router.post('/', protect, admin, uploadHomeImage.single('image'), createHomeImage);
router.put('/:id', protect, admin, uploadHomeImage.single('image'), updateHomeImage);
router.delete('/:id', protect, admin, deleteHomeImage);

module.exports = router;

