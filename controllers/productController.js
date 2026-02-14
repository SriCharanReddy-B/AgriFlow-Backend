const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Only Logged In Farmers)
const createProduct = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.price) {
    res.status(400);
    throw new Error('Please add a name and price');
  }

  const product = await Product.create({
    user: req.user.id, // <--- MAGIC: Getting ID from the Token
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    countInStock: req.body.countInStock,
    image: req.body.image
  });

  res.status(201).json(product);
});
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  createProduct,
  getProductById, // <--- Add this line right here!
};