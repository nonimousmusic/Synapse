const express = require('express');
const router = express.Router();
const { Progress } = require('../models');

// Mock backend curriculum database
const BOOTCAMP_CURRICULUM = [
  { day: 1, topic: 'Vishesh Learning Lab', sublabel: 'AI Foundations' },
  { day: 14, topic: 'Optimization Strategies', sublabel: 'LORA focus' },
  { day: 15, topic: 'Milestone Assessment', sublabel: 'Phase 1 Validation' },
  { day: 22, topic: 'Vishesh Learning Lab', sublabel: 'Deployment & Scale' },
  { day: 30, topic: 'Final Validation', sublabel: 'Certification Day' },
];

router.get('/:userId', async (req, res) => {
  try {
    const progress = await Progress.findOne({ where: { userId: req.params.userId } });
    if (!progress) return res.status(404).json({ error: 'Progress not found' });

    // Enhance curriculum with user status
    const currentDay = progress.currentDay;
    const curriculumWithStatus = BOOTCAMP_CURRICULUM.map((item) => {
      let status = 'locked';
      if (item.day < currentDay) status = 'complete';
      else if (item.day === currentDay) status = 'active';
      return { ...item, status };
    });

    res.json(curriculumWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
