import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import UserInfo from './UserInfo';
import TransactionList from './TransactionList';
import FilterOptions from './FilterOptions';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0056b3', // SBI blue color
    },
  },
});

const Passbook = () => {
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [transactionType, setTransactionType] = useState('all');

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1" color="primary">
              SBI Passbook
            </Typography>
            <img src="/sbi-logo.png" alt="SBI Logo" style={{ height: 50 }} />
          </Box>
          <UserInfo />
          <FilterOptions 
            dateRange={dateRange} 
            setDateRange={setDateRange}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />
          <TransactionList 
            dateRange={dateRange}
            transactionType={transactionType}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Passbook;