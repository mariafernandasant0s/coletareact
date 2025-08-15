// src/routes/AppRoutes.js

import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// --- Componentes de Página Carregados com "Lazy Loading" ---
const HomePage = lazy(() => import('../pages/public/Home'));
const GenericPage = lazy(() => import('../pages/public/GenericPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const EditPage = lazy(() => import('../pages/admin/EditPage'));

// --- Componente para Rolar a Página para o Topo ---
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
    /* 
      ================================================================
      A CORREÇÃO ESTÁ AQUI:
      O fallback agora é um div simples, que não depende de nenhum
      componente externo que não existe.
      ================================================================
    */
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Carregando...</div>}>
      <ScrollToTop />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/como-separar/como-fazer" element={<GenericPage slug="como-fazer-separacao" />} />
        <Route path="/como-separar/residuos" element={<GenericPage slug="quais-residuos" />} />
        <Route path="/como-separar/porque-separar" element={<GenericPage slug="porque-separar" />} />
        <Route path="/quemsomos" element={<GenericPage slug="quem-somos" />} />
        <Route path="/total-coletado" element={<GenericPage slug="total-coletado-grafico" />} />
        <Route path="/contato" element={<GenericPage slug="contato" />} />
        <Route path="/faq" element={<GenericPage slug="faq" />} />
        <Route path="/desenvolvedoras" element={<GenericPage slug="desenvolvedoras" />} />
        
        {/* Rotas de Admin */}
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/paginas/edit/:id" element={<PrivateRoute><EditPage /></PrivateRoute>} />

        {/* Rota de "Não Encontrado" */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
