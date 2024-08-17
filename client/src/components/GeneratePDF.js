import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

const GeneratePDF = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGeneratePDF = () => {
    // Handle PDF generation, e.g., call the backend API to generate and download PDF
    alert('PDF generated and downloaded!');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Generate PDF Statement
        </Typography>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleGeneratePDF}>
          Generate PDF
        </Button>
      </Paper>
    </Container>
  );
};

export default GeneratePDF;
