const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController'); // Import getMe
const { protect } = require('../middleware/authMiddleware'); // Import the bouncer

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // <--- Add 'protect' as the middleman

module.exports = router;