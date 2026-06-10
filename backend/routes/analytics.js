const express = require('express');
const router = express.Router();
const { User, Progress, Assessment } = require('../models');
const { Op } = require('sequelize');

router.get('/overview', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const activeUsers = await User.count({
      where: { updatedAt: { [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    });
    const totalAssessments = await Assessment.count({ where: { completed: true } });
    const avgGrowth = await Progress.findAll({ attributes: ['growthScore'] });
    const avgGrowthScore = avgGrowth.length
      ? Math.round(avgGrowth.reduce((s, p) => s + p.growthScore, 0) / avgGrowth.length)
      : 0;

    res.json({
      totalUsers,
      activeUsers,
      totalAssessments,
      avgGrowthScore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
