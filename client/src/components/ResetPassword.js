import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Paper, Typography, Alert, Link } from '@mui/material';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Ensure the token is extracted from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending token:', token); // Add this line
      console.log('Sending password:', password); // Add this line
      const response = await axios.post('/api/auth/reset-password', { token, password });
      setMessage(response.data.msg);
      setError('');
    } catch (error) {
      setMessage('');
      console.log('Error response:', error.response);
      setError(error.response ? error.response.data.msg : 'Server error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Remembered your password? <Link href="/login">Login here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
