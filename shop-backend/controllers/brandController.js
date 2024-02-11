// controllers/brandController.js
const Brand = require('../models/Brand');

exports.addBrand = async (req, res) => {
  try {
    const { brand_name } = req.body;
    const newBrand = await Brand.create({ brand_name });
    res.status(201).json(newBrand);
  } catch (error) {
    console.error('Error adding brand:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
