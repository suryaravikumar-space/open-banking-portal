
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navigation = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState(null);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClick = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Grid>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{justifyContent:""}}>
          <AccountBalanceIcon sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }} />
          <Typography 
            variant="h6"
            noWrap
            // component="a"
            component={Link} to="/"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
                display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            Open Banking
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchorEl}
                open={Boolean(mobileMenuAnchorEl)}
                onClose={handleMobileMenuClose}
              >
                <MenuItem component={Link} to="/">
                  Home
                </MenuItem>
                {isAuthenticated && (
                  <>
                    <MenuItem component={Link} to="/dashboard">
                      Dashboard
                    </MenuItem>
                    <MenuItem component={Link} to="/balance">
                      Balance
                    </MenuItem>
                    <MenuItem component={Link} to="/transfer">
                      International Transfer
                    </MenuItem>
                    <MenuItem onClick={handleMenuClick}>
                      Saving Account Management
                    </MenuItem>
                    <Menu
                      id="saving-account-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem component={Link} to="/saving-account/open">
                        Open New Account
                      </MenuItem>
                      <MenuItem component={Link} to="/saving-account/passbook">
                        View Passbook
                      </MenuItem>
                      <MenuItem component={Link} to="/saving-account/deposit">
                        Deposit Cash
                      </MenuItem>
                      <MenuItem component={Link} to="/saving-account/last-10">
                        View Last 10 Transactions
                      </MenuItem>
                      <MenuItem component={Link} to="/saving-account/generate-pdf">
                        Generate PDF
                      </MenuItem>
                    </Menu>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <MenuItem component={Link} to="/login">
                      Login
                    </MenuItem>
                    <MenuItem component={Link} to="/register">
                      Register
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              {isAuthenticated && (
                <>
                  <Button color="inherit" component={Link} to="/dashboard">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={Link} to="/balance">
                    Balance
                  </Button>
                  <Button color="inherit" component={Link} to="/transfer">
                    IT
                  </Button>
                  <Button
                    color="inherit"
                    aria-controls="saving-account-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                  >
                   SAM
                  </Button>
                  <Menu
                    id="saving-account-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem component={Link} to="/saving-account/open">
                      Open New Account
                    </MenuItem>
                    <MenuItem component={Link} to="/saving-account/passbook">
                      View Passbook
                    </MenuItem>
                    <MenuItem component={Link} to="/saving-account/deposit">
                      Deposit Cash
                    </MenuItem>
                    <MenuItem component={Link} to="/saving-account/last-10">
                      View Last 10 Transactions
                    </MenuItem>
                    <MenuItem component={Link} to="/saving-account/generate-pdf">
                      Generate PDF
                    </MenuItem>
                  </Menu>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navigation;





