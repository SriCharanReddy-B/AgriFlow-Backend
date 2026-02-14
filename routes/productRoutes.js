const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware'); // Import the Bouncer

// Anyone can SEE products
router.get('/', getProducts);

// Only Logged-in users can ADD products
router.post('/', protect, createProduct);


// ... existing routes
router.get('/:id', getProductById); // <--- ADD THIS
module.exports = router;