import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, CircularProgress } from '@mui/material';

const AccountBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('/api/account/balance', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setBalance(response.data.balance);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.msg : 'Server error');
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Account Balance
        </Typography>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {balance !== null && (
          <Typography variant="h6">
            Your account balance is ${balance.toFixed(2)}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AccountBalance;
