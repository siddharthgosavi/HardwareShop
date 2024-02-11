// controllers/unitController.js
const Unit = require('../models/Unit');

exports.addUnit = async (req, res) => {
  try {
    const { unit_name } = req.body;
    const newUnit = await Unit.create({ unit_name });
    res.status(201).json(newUnit);
  } catch (error) {
    console.error('Error adding unit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};