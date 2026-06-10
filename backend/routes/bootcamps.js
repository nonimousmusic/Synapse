const express = require('express');
const router = express.Router();
const { Bootcamp, CurriculumDay } = require('../models');

router.get('/', async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({ where: { isActive: true } });
    res.json(bootcamps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.id, {
      include: [{ model: CurriculumDay, order: [['day', 'ASC']] }],
    });
    if (!bootcamp) return res.status(404).json({ error: 'Bootcamp not found' });
    res.json(bootcamp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
