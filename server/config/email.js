const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
});

const sendResetEmail = (to, token) => {
  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  const mailOptions = {
    from: 'no-reply@example.com',
    to,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
