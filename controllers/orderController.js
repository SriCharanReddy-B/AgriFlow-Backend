const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order & Deduct Stock
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // 1. Create the Order
    const order = new Order({
      orderItems,
      user: req.user.id, // From the Bouncer token
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();

    // 2. Update the Product Stock (The "Transaction")
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock -= item.qty;
        await product.save();
      }
    }

    res.status(201).json(createdOrder);
  }
});

module.exports = { addOrderItems };