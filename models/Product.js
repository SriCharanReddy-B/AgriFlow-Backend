const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // <--- This links the Crop to the Farmer
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    image: {
      type: String,
      required: false,
      default: 'https://via.placeholder.com/150', // Default image for now
    },
    category: {
      type: String,
      required: [true, 'Please add a category'], // e.g., "Grains", "Vegetables"
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    countInStock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);