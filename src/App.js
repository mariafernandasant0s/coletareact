// src/App.js

import React, { useState, useEffect } from 'react'; // ✅ Adicionado useState e useEffect
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar'; // ✅ Importando a UtilityBar

import './assets/css/style.css'; 

function App() {
  // ✅ 1. Cria o estado para controlar o alto contraste
  const [isHighContrast, setHighContrast] = useState(false);

  // ✅ 2. Cria a função que liga e desliga o modo
  const toggleHighContrast = () => {
    setHighContrast(prevState => !prevState);
  };

  // ✅ 3. Efeito que aplica ou remove a classe CSS do corpo da página
  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          {/* ✅ 4. Passa a função para a Barra de Utilidades */}
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
