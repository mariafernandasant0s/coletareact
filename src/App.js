
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';


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
    </HelmetProvider>
  );
}

export default App;
