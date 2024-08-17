import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material';

const OpenNewAccount = () => {
  const [accountName, setAccountName] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., call the backend API to create a new account
    // If successful, show success message and reset form fields
    // If failed, show error message
    setSuccess('Account opened successfully!');
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Open New Savings Account
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Initial Deposit"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Open Account
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default OpenNewAccount;
