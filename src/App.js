// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar';

import './assets/css/style.css'; 

function App() {
  const [isHighContrast, setHighContrast] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(prevState => !prevState);
  };

  useEffect(() => {
    // Limpa classes antigas e adiciona a nova se necessário
    document.body.classList.remove('high-contrast');
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    }
  }, [isHighContrast]);

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          {/* A Barra de Utilidades com a nova função */}
          <UtilityBar onToggleHighContrast={toggleHighContrast} />
          
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
          <StickyInstaButton />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
