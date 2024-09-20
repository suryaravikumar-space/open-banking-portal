import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const AccountForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    pan: "",
    gender: "",
    accountType: "",
    minBalance: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate an API call with Axios or other method
      // Example: const response = await axios.post('/api/accounts', formData);
      // For demonstration purposes, we'll just simulate a success scenario
      setMessage("Form submitted successfully!");
      setError("");
    } catch (error) {
      setMessage("");
      setError("Form submission failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Account Form
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="PAN"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              label="Gender"
              onChange={handleChange}
              
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Account Type</InputLabel>
            <Select
              name="accountType"
              value={formData.accountType}
              label="Account Type"
              onChange={handleChange}
        
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="current">Current</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Minimum Balance"
            type="number"
            name="minBalance"
            value={formData.minBalance}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AccountForm;
