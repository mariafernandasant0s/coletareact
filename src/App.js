// src/App.js (Versão Correta, sem Router)

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './routes/AppRoutes';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar';
import BackToTopButton from './components/BackToTopButton';

import './assets/css/style.css'; 

function App() {
  return (
    <HelmetProvider>
      {/* O Router NÃO fica aqui */}
      <UtilityBar />
      <Header />
      
      {/* A classe para a animação de surgimento fica aqui */}
      <main className="content-fade-in">
        <AppRoutes />
      </main>
      
      <Footer />
      <StickyInstaButton />
      <BackToTopButton /> 
    </HelmetProvider>
  );
}

export default App;
