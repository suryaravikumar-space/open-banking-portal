import React from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';

const UserInfo = () => {
  const userInfo = {
    accountNumber: '1234567890',
    cifNumber: 'CIF123456',
    ifscCode: 'SBIN0001234',
    customerName: 'John Doe',
    branchCode: 'BR001',
    branchLocation: 'Mumbai Main Branch',
    openingDate: '2020-01-01',
    accountStatus: 'Active',
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Account Information</Typography>
      <Grid container spacing={2}>
        {Object.entries(userInfo).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            <Box display="flex">
              <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </Typography>
              <Typography variant="body2">{value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default UserInfo;