// src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StickyInstaButton from './components/common/StickyInstaButton';
import UtilityBar from './components/common/UtilityBar';

import './assets/css/style.css'; 

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <UtilityBar />
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
