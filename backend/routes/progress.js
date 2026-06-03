const express = require('express');
const router = express.Router();
const { Progress } = require('../models');

// Fetch user progress
router.get('/:userId', async (req, res) => {
  try {
    const progress = await Progress.findOne({ where: { userId: req.params.userId } });
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update day progression
router.post('/:userId/complete-day', async (req, res) => {
  try {
    const progress = await Progress.findOne({ where: { userId: req.params.userId } });
    if (!progress) return res.status(404).json({ error: 'Progress not found' });

    progress.currentDay += 1;
    progress.streak += 1;
    await progress.save();

    res.json({ message: 'Day completed', progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update scores from assessment
router.post('/:userId/assessment', async (req, res) => {
  try {
    const { scores } = req.body;
    const progress = await Progress.findOne({ where: { userId: req.params.userId } });
    if (!progress) return res.status(404).json({ error: 'Progress not found' });

    if (scores.knowledge) progress.knowledgeScore = scores.knowledge;
    if (scores.velocity) progress.velocityScore = scores.velocity;
    
    // Growth score formula
    progress.growthScore = Math.round((progress.knowledgeScore + progress.velocityScore) / 2);
    
    await progress.save();
    res.json({ message: 'Assessment saved', progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
