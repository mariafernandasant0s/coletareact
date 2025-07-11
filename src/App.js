// src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Para o Router funcionar
import { HelmetProvider } from 'react-helmet-async'; // Para o Helmet funcionar

// Importa APENAS os componentes de layout
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar';

// Importa o seu CSS
import './assets/css/style.css'; 

function App() {
  return (
    <HelmetProvider>
      <Router>
        <UtilityBar />
        <Header />
        <main>
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Estrutura Principal Recuperada</h1>
            <p>O Header e o Footer estão funcionando. O problema está nas rotas ou nas páginas.</p>
          </div>
        </main>
        <Footer />
        <StickyInstaButton />
      </Router>
    </HelmetProvider>
  );
}

export default App;
