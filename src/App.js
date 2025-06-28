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
  const [fontSize, setFontSize] = useState(16); // Controla o tamanho da fonte base
  const [isHighContrast, setHighContrast] = useState(false);

  // Funções para aumentar e diminuir a fonte
  const increaseFontSize = () => setFontSize(prevSize => prevSize + 2);
  const decreaseFontSize = () => setFontSize(prevSize => prevSize - 2);

  // Função para ligar/desligar o alto contraste
  const toggleHighContrast = () => {
    setHighContrast(prevState => !prevState);
  };

  // Efeito que aplica o tamanho da fonte no HTML
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);
  
  // Efeito que aplica a classe de alto contraste no body
  useEffect(() => {
    document.body.classList.remove('high-contrast');
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    }
  }, [isHighContrast]);

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <UtilityBar 
            onIncreaseFontSize={increaseFontSize}
            onDecreaseFontSize={decreaseFontSize}
            onToggleHighContrast={toggleHighContrast}
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
