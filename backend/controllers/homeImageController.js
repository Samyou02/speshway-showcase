const HomeImage = require('../models/HomeImage');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all home images (active only for public)
// @route   GET /api/home-images
// @access  Public
const getHomeImages = async (req, res) => {
  try {
    const query = req.user && req.user.role === 'admin' 
      ? {} 
      : { isActive: true };
    
    const homeImages = await HomeImage.find(query)
      .populate('createdBy', 'name email')
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: homeImages
    });
  } catch (error) {
    console.error('Error fetching home images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch home images',
      error: error.message
    });
  }
};

// @desc    Get single home image
// @route   GET /api/home-images/:id
// @access  Public
const getHomeImage = async (req, res) => {
  try {
    const homeImage = await HomeImage.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!homeImage) {
      return res.status(404).json({
        success: false,
        message: 'Home image not found'
      });
    }

    res.status(200).json({
      success: true,
      data: homeImage
    });
  } catch (error) {
    console.error('Error fetching home image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch home image',
      error: error.message
    });
  }
};

// @desc    Create new home image
// @route   POST /api/home-images
// @access  Private (Admin)
const createHomeImage = async (req, res) => {
  try {
    const { title, description, order } = req.body;

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    // Create home image
    const homeImage = await HomeImage.create({
      title: title || '',
      description: description || '',
      order: order ? parseInt(order) : Date.now(),
      isActive: true, // Ensure new images are active by default
      image: {
        url: req.file.path,
        publicId: req.file.filename
      },
      createdBy: req.user.id
    });

    // Populate createdBy field for response
    await homeImage.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Home image created successfully',
      data: homeImage
    });
  } catch (error) {
    console.error('Error creating home image:', error);
    
    // Clean up uploaded image if creation failed
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create home image',
      error: error.message
    });
  }
};

// @desc    Update home image
// @route   PUT /api/home-images/:id
// @access  Private (Admin)
const updateHomeImage = async (req, res) => {
  try {
    const { title, description, isActive, order } = req.body;

    // Find existing home image
    let homeImage = await HomeImage.findById(req.params.id);

    if (!homeImage) {
      return res.status(404).json({
        success: false,
        message: 'Home image not found'
      });
    }

    // Store old image info in case we need to delete it
    const oldImagePublicId = homeImage.image.publicId;

    // Update fields
    if (title !== undefined) homeImage.title = title;
    if (description !== undefined) homeImage.description = description;
    if (isActive !== undefined) homeImage.isActive = isActive;
    if (order !== undefined) homeImage.order = parseInt(order);

    // Handle new image upload
    if (req.file) {
      homeImage.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    await homeImage.save();

    // Populate createdBy field for response
    await homeImage.populate('createdBy', 'name email');

    // Delete old image from Cloudinary if new image was uploaded
    if (req.file && oldImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldImagePublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting old image from Cloudinary:', cloudinaryError);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Home image updated successfully',
      data: homeImage
    });
  } catch (error) {
    console.error('Error updating home image:', error);

    // Clean up uploaded image if update failed
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update home image',
      error: error.message
    });
  }
};

// @desc    Delete home image
// @route   DELETE /api/home-images/:id
// @access  Private (Admin)
const deleteHomeImage = async (req, res) => {
  try {
    const homeImage = await HomeImage.findById(req.params.id);

    if (!homeImage) {
      return res.status(404).json({
        success: false,
        message: 'Home image not found'
      });
    }

    // Delete image from Cloudinary
    if (homeImage.image.publicId) {
      try {
        await cloudinary.uploader.destroy(homeImage.image.publicId);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
      }
    }

    await homeImage.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Home image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting home image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete home image',
      error: error.message
    });
  }
};

module.exports = {
  getHomeImages,
  getHomeImage,
  createHomeImage,
  updateHomeImage,
  deleteHomeImage
};

