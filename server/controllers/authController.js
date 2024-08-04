const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../config/email');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      console.log('Received login request:', { email, password });
  
      let user = await User.findOne({ email });
      if (!user) {
        console.log('Invalid credentials: User not found');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Invalid credentials: Password mismatch');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
        console.log(token);
      });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
      console.log(`Requesting password reset for: ${email}`);
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User with this email does not exist');
        return res.status(400).json({ msg: 'User with this email does not exist' });
      }
  
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
      console.log(`Generated reset token: ${resetToken}`);
      console.log(`Reset token expiration: ${new Date(user.resetPasswordExpires).toISOString()}`);
  
      await user.save();
      console.log('Password reset token saved');
  
      await sendResetEmail(email, resetToken);
      console.log('Password reset email sent');
  
      res.status(200).json({ msg: 'Password reset email sent' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
      console.log('Received token:', token); // Add this line
      console.log('Received password:', password); // Add this line
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        console.log('Token invalid or expired'); 
        return res.status(400).json({ msg: 'Invalid or expired token' });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ msg: 'Password reset successfully' });
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).send('Server error');
    }
  };

 
  
  