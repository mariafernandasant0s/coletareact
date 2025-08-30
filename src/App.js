// src/App.js (VERSÃO CORRIGIDA - SEM ROUTER)

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

// O import do Router foi REMOVIDO daqui

// Importe o Provedor de Contexto
import { AuthProvider } from './contexts/AuthContext';

// Importe seus componentes
import AppRoutes from './routes/AppRoutes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar';
import BackToTopButton from './components/BackToTopButton';

// Importe seu CSS
import './assets/css/style.css'; 

function App() {
  return (
    <HelmetProvider>
      {/* O Router foi REMOVIDO daqui */}
      <AuthProvider>
        <UtilityBar />
        <Header />
        <main className="content-fade-in">
          <AppRoutes />
        </main>
        <Footer />
        <StickyInstaButton />
        <BackToTopButton /> 
      </AuthProvider>
      {/* O Router foi REMOVIDO daqui */}
    </HelmetProvider>
  );
}

export default App;
