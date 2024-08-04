import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
      <Button color="inherit" component={Link} to="/transfer">
        Initiate International Transfer
      </Button>
    </div>
  );
};

export default Dashboard;
