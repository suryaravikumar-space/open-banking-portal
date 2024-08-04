const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  recipientName: { type: String, required: true },
  country: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  exchangeRate: { type: Number, required: true },
  transferFees: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transfer', TransferSchema);
