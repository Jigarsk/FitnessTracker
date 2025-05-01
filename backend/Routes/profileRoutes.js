const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mock authentication middleware (Replace with real auth in production)
const mockAuth = (req, res, next) => {
  req.userId = "662fffe6d7b96557ee4c5059"; // Replace with real logged-in user ID
  next();
};

router.use(mockAuth);

// GET user profile
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});

// PUT (update) user profile
router.put('/', async (req, res) => {
  const { name, email, phone, birthdate, location } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(
      req.userId,
      { name, email, phone, birthdate, location },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', err });
  }
});

module.exports = router;
