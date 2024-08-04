const User = require('../models/User');
require('dotenv').config();

exports.getAccountBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('balance');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
