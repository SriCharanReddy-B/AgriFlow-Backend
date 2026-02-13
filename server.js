const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware to accept JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ... existing imports
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes')); // <--- ADD THIS
// ... existing code
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));