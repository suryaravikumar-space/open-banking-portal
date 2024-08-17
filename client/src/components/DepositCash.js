import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material';

const DepositCash = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., call the backend API to deposit cash
    // If successful, show success message and reset form fields
    // If failed, show error message
    setSuccess('Cash deposited successfully!');
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Deposit Cash
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Deposit Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Deposit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default DepositCash;
