import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navigation = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Corporate Banking
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/balance">
              Balance
            </Button> 
            <Button color="inherit" component={Link} to="/transfer">
              International Transfer
            </Button>
            <Button
              color="inherit"
              aria-controls="saving-account-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              Saving Account Management
            </Button>
            <Menu
              id="saving-account-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/saving-account/open" onClick={handleMenuClose}>Open New Account</MenuItem>
              <MenuItem component={Link} to="/saving-account/passbook" onClick={handleMenuClose}>View Passbook</MenuItem>
              <MenuItem component={Link} to="/saving-account/deposit" onClick={handleMenuClose}>Deposit Cash</MenuItem>
              <MenuItem component={Link} to="/saving-account/transactions" onClick={handleMenuClose}>View Last 10 Transactions</MenuItem>
              <MenuItem component={Link} to="/saving-account/generate-pdf" onClick={handleMenuClose}>Generate PDF</MenuItem>
            </Menu>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
