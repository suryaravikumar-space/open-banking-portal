import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import InternationalTransfer from "./components/InternationalTransfer";
import RequestPasswordReset from "./components/RequestPasswordReset";
import ResetPassword from "./components/ResetPassword";
import AccountBalance from "./components/AccountBalance";
import OpenSavingAccount from "./components/OpenSavingAccount";
import ViewPassbook from "./components/ViewPassbook";
import DepositCash from "./components/DepositCash";
import ViewLast10Transactions from "./components/ViewLast10Transactions";
import GeneratePDF from "./components/GeneratePDF";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const PublicRoute = ({ children }) => {
    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
  };

  return (
    <Router>
      <CssBaseline />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navigation
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <main style={{ flex: 1, padding: "1rem", paddingTop: "64px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Login setIsAuthenticated={setIsAuthenticated} /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/request-password-reset" element={<PublicRoute><RequestPasswordReset /></PublicRoute>} />
            <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/transfer" element={<PrivateRoute><InternationalTransfer /></PrivateRoute>} />
            <Route path="/balance" element={<PrivateRoute><AccountBalance /></PrivateRoute>} />
            <Route path="/saving-account/open" element={<PrivateRoute><OpenSavingAccount /></PrivateRoute>} />
            <Route path="/saving-account/passbook" element={<PrivateRoute><ViewPassbook /></PrivateRoute>} />
            <Route path="/saving-account/deposit" element={<PrivateRoute><DepositCash /></PrivateRoute>} />
            <Route path="/saving-account/transactions" element={<PrivateRoute><ViewLast10Transactions /></PrivateRoute>} />
            <Route path="/saving-account/generate-pdf" element={<PrivateRoute><GeneratePDF /></PrivateRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;