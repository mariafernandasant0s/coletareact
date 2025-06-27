// src/App.js

import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

// CORREÇÃO DOS CAMINHOS DE IMPORTAÇÃO:
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar';

// Importando o arquivo de rotas
import AppRoutes from './routes/AppRoutes';

// Importando os estilos globais
import './style.css'; 

function App() {
  const [fontSize, setFontSize] = useState(16);

  const handleIncreaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 2, 24));
  };

  const handleDecreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12));
  };

  // Aplica o tamanho da fonte ao elemento HTML
  document.documentElement.style.fontSize = `${fontSize}px`;
  
  return (
    <HelmetProvider>
      <div className="app-wrapper">
        <UtilityBar 
          onIncreaseFontSize={handleIncreaseFontSize} 
          onDecreaseFontSize={handleDecreaseFontSize} 
        />
        <Header />
        
        {/* A tag <main> deve ficar AQUI, envolvendo as rotas */}
        <main>
          <AppRoutes />
        </main>
        
        <Footer />
        <StickyInstaButton />
      </div>
    </HelmetProvider>
  );
}

export default App;
