// src/App.js

import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Importando componentes de layout
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar';

// Importando o arquivo de rotas
import AppRoutes from './routes/AppRoutes';

// Importando os estilos globais
import './assets/css/style.css';
function App() {
  const [fontSize, setFontSize] = useState(16); // Tamanho base da fonte

  const handleIncreaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 2, 24)); // Aumenta até 24px
  };

  const handleDecreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12)); // Diminui até 12px
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
        <main>
          <AppRoutes /> {/* O Roteador vai renderizar as páginas AQUI DENTRO */}
        </main>
        <Footer />
        <StickyInstaButton />
      </div>
    </HelmetProvider>
  );
}

export default App;
