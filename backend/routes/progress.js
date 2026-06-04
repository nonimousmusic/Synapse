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
    
    const currentHistory = progress.history || [];
    currentHistory.push({ day: progress.currentDay, score: progress.growthScore || 0 });
    progress.history = currentHistory;

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
    if (scores.technical) progress.technicalScore = scores.technical;
    if (scores.communication) progress.communicationScore = scores.communication;
    if (scores.problemSolving) progress.problemSolvingScore = scores.problemSolving;
    if (scores.consistency) progress.consistencyScore = scores.consistency;
    if (scores.retention) progress.retentionScore = scores.retention;
    
    // Growth score formula
    const allScores = [
      progress.technicalScore || 70,
      progress.problemSolvingScore || 65,
      progress.communicationScore || 75,
      progress.consistencyScore || 80,
      progress.retentionScore || 60,
      progress.velocityScore || 70
    ];
    progress.growthScore = Math.round(allScores.reduce((a,b) => a+b, 0) / allScores.length);
    
    // Append to history
    const currentHistory = progress.history || [];
    currentHistory.push({ day: progress.currentDay, score: progress.growthScore });
    progress.history = currentHistory;

    await progress.save();
    res.json({ message: 'Assessment saved', progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
