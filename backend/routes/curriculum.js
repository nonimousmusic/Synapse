const express = require('express');
const router = express.Router();
const { CurriculumDay, Bootcamp, Progress } = require('../models');

router.get('/:userId', async (req, res) => {
  try {
    const { bootcampId } = req.query;
    const progress = await Progress.findOne({ where: { userId: req.params.userId } });
    if (!progress) return res.status(404).json({ error: 'Progress not found' });

    const where = bootcampId ? { bootcampId } : {};
    const days = await CurriculumDay.findAll({
      where,
      order: [['day', 'ASC']],
      include: [{ model: Bootcamp, attributes: ['name', 'slug', 'color'] }],
    });

    const currentDay = progress.currentDay;
    const curriculumWithStatus = days.map((item) => {
      const d = item.toJSON();
      let status = 'locked';
      if (d.day < currentDay) status = 'complete';
      else if (d.day === currentDay) status = 'active';
      return { ...d, status };
    });

    res.json(curriculumWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const days = await CurriculumDay.findAll({
      order: [['day', 'ASC']],
      include: [{ model: Bootcamp, attributes: ['name', 'slug', 'color'] }],
    });
    res.json(days);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
