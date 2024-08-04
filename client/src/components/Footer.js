import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        py: 2,
      }}
    >
      <Typography variant="body1">&copy; 2024 Corporate Banking Application</Typography>
    </Box>
  );
};

export default Footer;
