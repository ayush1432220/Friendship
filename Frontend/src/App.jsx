import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthService from './services/authService';
import LoginPage from './pages/LoginPage';
import SecureContent from './pages/SecureContent';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const hasValidSession = AuthService.validateSession();
    setIsAuthenticated(hasValidSession);
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    AuthService.clearSession();
    setIsAuthenticated(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <SecureContent onLogout={handleLogout} />;
};

export default App;