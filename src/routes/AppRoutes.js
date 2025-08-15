// src/routes/AppRoutes.js

// --- 1. PRIMEIRO, TODOS OS IMPORTS DIRETOS ---
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import PrivateRoute from './PrivateRoute';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import EditPage from '../pages/admin/EditPage';

// --- 2. DEPOIS, AS DECLARAÇÕES COM LAZY ---
const HomePage = lazy(() => import('../pages/public/Home'));
const GenericPage = lazy(() => import('../pages/public/GenericPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));


// --- 3. FINALMENTE, O RESTO DO CÓDIGO ---
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/como-separar/como-fazer" element={<GenericPage slug="como-fazer-separacao" />} />
          <Route path="/como-separar/residuos" element={<GenericPage slug="quais-residuos" />} />
          <Route path="/como-separar/porque-separar" element={<GenericPage slug="porque-separar" />} />
          <Route path="/quemsomos" element={<GenericPage slug="quem-somos" />} />
          <Route path="/total-coletado" element={<GenericPage slug="total-coletado-grafico" />} />
          <Route path="/contato" element={<GenericPage slug="contato" />} />
          <Route path="/faq" element={<GenericPage slug="faq" />} />
          <Route path="/desenvolvedoras" element={<GenericPage slug="desenvolvedoras" />} />
          
          {/* --- Rotas de Admin --- */}
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={<PrivateRoute><AdminDashboard /></PrivateRoute>} 
          />
          <Route 
            path="/admin/paginas/edit/:id" 
            element={<PrivateRoute><EditPage /></PrivateRoute>} 
          />

          {/* --- Rota de Fallback (404) --- */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
