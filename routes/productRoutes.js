const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware'); // Import the Bouncer

// Anyone can SEE products
router.get('/', getProducts);

// Only Logged-in users can ADD products
router.post('/', protect, createProduct);

module.exports = router;