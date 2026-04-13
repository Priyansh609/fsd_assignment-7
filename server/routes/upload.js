const express = require('express');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const Product = require('../models/Product');

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload a product image
// @access  Private
router.post('/', protect, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided. Use field name "image".',
      });
    }

    try {
      // Build the image URL
      const imageUrl = `/uploads/${req.file.filename}`;

      // Optionally create a product record if title and price are provided
      let product = null;
      if (req.body.title && req.body.price) {
        product = await Product.create({
          title: req.body.title,
          description: req.body.description || '',
          price: parseFloat(req.body.price),
          category: req.body.category || 'general',
          image: imageUrl,
          user: req.user._id,
        });
      }

      res.status(201).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          filename: req.file.filename,
          path: imageUrl,
          size: req.file.size,
          mimetype: req.file.mimetype,
          product: product || undefined,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error saving upload record',
        error: error.message,
      });
    }
  });
});

module.exports = router;
