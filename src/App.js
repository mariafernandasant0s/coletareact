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
  // ✅ 1. CRIA O ESTADO PARA CONTROLAR O TAMANHO DA FONTE
  const [fontSize, setFontSize] = useState(16); // 16px é o tamanho padrão

  // ✅ 2. CRIA AS FUNÇÕES QUE MUDAM O ESTADO
  const increaseFontSize = () => setFontSize(prevSize => prevSize + 2);
  const decreaseFontSize = () => setFontSize(prevSize => prevSize - 2);

  // ✅ 3. EFEITO QUE APLICA O NOVO TAMANHO DA FONTE AO SITE INTEIRO
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          {/* ✅ 4. PASSA AS FUNÇÕES PARA A BARRA DE UTILIDADES */}
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
