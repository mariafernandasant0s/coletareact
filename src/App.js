// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// 1. IMPORTE O NOVO COMPONENTE
import BackToTopButton from './components/BackToTopButton';

import './App.css';
import "yet-another-react-lightbox/styles.css";

function App() {
  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <div className="app-container">
            <Header />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
            
            {/* 2. ADICIONE O BOTÃO AQUI */}
            <BackToTopButton />
          </div>
        </AuthProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
