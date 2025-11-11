const express = require('express');
const router = express.Router();
const {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryStats,
  getCategories,
  createCategory,
  deleteCategory
} = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const { createCloudinaryStorage } = require('../config/cloudinary');

// Configure multer for gallery images
const uploadGalleryImage = multer({
  storage: createCloudinaryStorage('speshway/gallery'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
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
router.get('/', getGalleryItems);
router.get('/stats', getGalleryStats);
router.get('/categories', getCategories);
router.get('/:id', getGalleryItem);

// Admin routes (protected)
router.post('/categories', protect, admin, createCategory);
router.delete('/categories/:name', protect, admin, deleteCategory);
router.post('/', protect, admin, uploadGalleryImage.single('image'), createGalleryItem);
router.put('/:id', protect, admin, uploadGalleryImage.single('image'), updateGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

module.exports = router;