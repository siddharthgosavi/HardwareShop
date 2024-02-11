// routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

router.post('/', brandController.addBrand);

module.exports = router;