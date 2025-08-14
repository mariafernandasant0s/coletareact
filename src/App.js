import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Importa o componente do botão "Voltar ao Topo"
import BackToTopButton from './components/BackToTopButton';

// Importa os arquivos de estilo globais
import './App.css';
import "yet-another-react-lightbox/styles.css";

function App() {
  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          {/* 
            Este é o container principal que tem a regra de CSS 
            que estava escondendo o botão.
          */}
          <div className="app-container">
            <Header />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
          </div>
          
          {/* 
            O BOTÃO FOI MOVIDO PARA CÁ!
            Estando fora do 'app-container', ele não será mais afetado 
            pela regra 'overflow' e aparecerá corretamente.
          */}
          <BackToTopButton />
        </AuthProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
