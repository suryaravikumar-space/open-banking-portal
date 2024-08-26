import React from 'react';
import { Paper, Typography, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FilterOptions = ({ dateRange, setDateRange, transactionType, setTransactionType }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Filter Transactions</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Start Date"
            type="date"
            value={dateRange.start || ''}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="End Date"
            type="date"
            value={dateRange.end || ''}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Transaction Type</InputLabel>
            <Select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              label="Transaction Type"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="debit">Debit Only</MenuItem>
              <MenuItem value="credit">Credit Only</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterOptions;