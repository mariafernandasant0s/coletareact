import React from 'react'; // Apenas o React é necessário aqui
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './routes/AppRoutes';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar';
import BackToTopButton from './components/BackToTopButton';

import './assets/css/style.css'; 

function App() {
  // O código 'useEffect' para rolar a página foi removido daqui.

  return (
    <HelmetProvider>
      <UtilityBar />
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
      <StickyInstaButton />
      <BackToTopButton /> 
    </HelmetProvider>
  );
}

export default App;
