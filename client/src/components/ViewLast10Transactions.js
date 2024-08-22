import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

const ViewLast10Transactions = () => {
  // Example data, replace with data fetched from backend
  const transactions = [
    { date: '2024-08-15', description: 'Deposit', amount: 1000, balance: 1000 },
    { date: '2024-08-16', description: 'Withdrawal', amount: -500, balance: 500 },
    // More transactions...
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Last 10 Transactions
        </Typography>
        <ul>
          {transactions.slice(0, 10).map((transaction, index) => (
            <li key={index}>
              {transaction.date} - {transaction.description} - {transaction.amount} - {transaction.balance}
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
};

export default ViewLast10Transactions;
