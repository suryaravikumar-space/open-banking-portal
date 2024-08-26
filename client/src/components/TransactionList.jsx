import React from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';

const TransactionList = ({ dateRange, transactionType }) => {
  // This would typically come from an API
  const transactions = [
    { id: 1, date: '2024-08-20', description: 'NEFT Credit', debit: null, credit: 5000, balance: 15000 },
    { id: 2, date: '2024-07-19', description: 'ATM Withdrawal', debit: 2000, credit: null, balance: 10000 },
    { id: 3, date: '2024-08-18', description: 'Interest Credit', debit: null, credit: 100, balance: 12000 },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;

    const dateInRange = (!startDate || transactionDate >= startDate) && 
                        (!endDate || transactionDate <= endDate);

    const typeMatch = transactionType === 'all' ||
                      (transactionType === 'debit' && transaction.debit) ||
                      (transactionType === 'credit' && transaction.credit);

    return dateInRange && typeMatch;
  });

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Transactions</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Debit</TableCell>
              <TableCell align="right">Credit</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell align="right">{transaction.debit}</TableCell>
                <TableCell align="right">{transaction.credit}</TableCell>
                <TableCell align="right">{transaction.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionList;