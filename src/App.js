import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers';
// import { CTA, Brand, Navbar } from './components';
import Logo from './assets/Lica-white.png';

import './App.css';
// import Home from './pages/home/Home';
import Login from './pages/login-page/LoginPage';
import NotFound from './pages/not found/NotFound';
import Dashboard from './pages/dashboard-page/Dashboard';
import Signup from './pages/signup-page/SignupPage';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import OtpPage from './pages/otp-page/OtpPage';

const App = () => {
  const ff = 5;
  console.log(ff);
  return (
    <Router>
      <div className="nav-bar">
        <Link to="/">
          <div className="nav-bar-logo">
            <img src={Logo} alt="logo" />
          </div>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-account" element={<Signup />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
