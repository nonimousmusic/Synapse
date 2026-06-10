const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/me', authenticate, async (req, res) => {
  res.json(req.user);
});

router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
