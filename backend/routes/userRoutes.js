const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/authController'); // Using authController for now as profile is related
const { protect } = require('../middlewares/authMiddleware');

router.get('/me', protect, getUserProfile);

module.exports = router;
