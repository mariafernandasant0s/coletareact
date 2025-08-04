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
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => setFontSize(prevSize => Math.min(prevSize + 2, 24)); // Limite máximo de 24px
  const decreaseFontSize = () => setFontSize(prevSize => Math.max(prevSize - 2, 12)); // Limite mínimo de 12px

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <UtilityBar 
            onIncreaseFontSize={increaseFontSize}
            onDecreaseFontSize={decreaseFontSize}
          />
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
