const express = require('express');
const router = express.Router();
const { initiateTransfer, getCountries, getCurrencies, getExchangeRate } = require('../controllers/transferController');

// Routes for international transfer
router.get('/countries', getCountries);
router.get('/currencies', getCurrencies);
router.get('/exchange-rate', getExchangeRate);
router.post('/initiate', initiateTransfer);

module.exports = router;
