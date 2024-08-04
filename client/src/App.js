import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import InternationalTransfer from './components/InternationalTransfer';
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/ResetPassword';
import AccountBalance from './components/AccountBalance';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main style={{ flex: 1, padding: '1rem', paddingTop: '64px' }}>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/transfer" element={isAuthenticated ? <InternationalTransfer /> : <Home />} />
            <Route path="/request-password-reset" element={<RequestPasswordReset />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/balance" element={isAuthenticated ? <AccountBalance /> : <Home />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
