import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Container, Paper, Alert } from '@mui/material';
import axios from 'axios';

const InternationalTransfer = () => {
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [recipientDetails, setRecipientDetails] = useState({
    bankName: '',
    accountNumber: '',
    recipientName: '',
  });
  const [exchangeRate, setExchangeRate] = useState('');
  const [transferFees, setTransferFees] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch available countries and currencies
    const fetchCountriesAndCurrencies = async () => {
      try {
        const countryResponse = await axios.get('/api/transfer/countries');
        const currencyResponse = await axios.get('/api/transfer/currencies');
        setCountries(countryResponse.data);
        setCurrencies(currencyResponse.data);
      } catch (error) {
        console.error('Error fetching countries and currencies', error);
      }
    };

    fetchCountriesAndCurrencies();
  }, []);

  useEffect(() => {
    if (selectedCountry && selectedCurrency) {
      // Fetch exchange rate and transfer fees
      const fetchExchangeRateAndFees = async () => {
        try {
          const response = await axios.get('/api/transfer/exchange-rate', {
            params: { country: selectedCountry, currency: selectedCurrency },
          });
          setExchangeRate(response.data.exchangeRate);
          setTransferFees(response.data.transferFees);
        } catch (error) {
          console.error('Error fetching exchange rate and fees', error);
        }
      };

      fetchExchangeRateAndFees();
    }
  }, [selectedCountry, selectedCurrency]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipientDetails({ ...recipientDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transfer/initiate', {
        ...recipientDetails,
        country: selectedCountry,
        currency: selectedCurrency,
        amount,
        exchangeRate,
        transferFees,
      });
      setMessage('Transfer initiated successfully');
    } catch (error) {
      console.error('Error initiating transfer', error);
      setMessage('Failed to initiate transfer');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Initiate International Transfer
        </Typography>
        {message && (
          <Alert severity={message.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            select
            label="Country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            fullWidth
            margin="dense"
          >
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Currency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            fullWidth
            margin="dense"
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Bank Name"
            name="bankName"
            value={recipientDetails.bankName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Account Number"
            name="accountNumber"
            value={recipientDetails.accountNumber}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Recipient Name"
            name="recipientName"
            value={recipientDetails.recipientName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="dense"
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Exchange Rate: {exchangeRate}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Transfer Fees: {transferFees}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary">
              Initiate Transfer
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default InternationalTransfer;
