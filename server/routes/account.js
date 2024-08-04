const express = require('express');
const { getAccountBalance } = require('../controllers/accountController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/balance', auth, getAccountBalance);

module.exports = router;
