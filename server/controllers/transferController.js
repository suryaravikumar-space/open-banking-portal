const axios = require('axios');
const Transfer = require('../models/Transfer');
const sendNotification = require('../utils/notification');

exports.getCountries = async (req, res) => {
  console.log('Received request for countries');
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    // Add more countries
  ];
  res.json(countries);
};

exports.getCurrencies = async (req, res) => {
  console.log('Received request for currencies');
  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'INR', name: 'Indian Rupee' },
    // Add more currencies
  ];
  res.json(currencies);
};

exports.getExchangeRate = async (req, res) => {
  const { country, currency } = req.query;
  console.log(`Received request for exchange rate for country: ${country}, currency: ${currency}`);
  const exchangeRate = 1.2; // Example rate
  const transferFees = 15; // Example fees
  res.json({ exchangeRate, transferFees });
};

exports.initiateTransfer = async (req, res) => {
  const { bankName, accountNumber, recipientName, country, currency, amount, exchangeRate, transferFees } = req.body;

  console.log('Initiating transfer with details:', {
    bankName,
    accountNumber,
    recipientName,
    country,
    currency,
    amount,
    exchangeRate,
    transferFees
  });

  try {
    const newTransfer = new Transfer({
      bankName,
      accountNumber,
      recipientName,
      country,
      currency,
      amount,
      exchangeRate,
      transferFees,
      status: 'Pending',
    });

    await newTransfer.save();

    sendNotification(recipientName, 'Your transfer has been initiated successfully.');

    res.json({ msg: 'Transfer initiated successfully' });
  } catch (error) {
    console.error('Error initiating transfer:', error);
    res.status(500).json({ msg: 'Failed to initiate transfer' });
  }
};
