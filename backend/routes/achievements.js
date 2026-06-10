const express = require('express');
const router = express.Router();
const { Achievement, UserAchievement, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userAchievements = await UserAchievement.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Achievement }],
    });
    res.json(userAchievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
