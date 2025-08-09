import React, { useEffect } from 'react';
// 1. Adicionar as importações necessárias
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import PrivateRoute from './PrivateRoute';

import HomePage from '../pages/public/Home';
import GenericPage from '../pages/public/GenericPage';
import NotFoundPage from '../pages/public/NotFoundPage';

import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import EditPage from '../pages/admin/EditPage';

// 2. Criar o componente auxiliar de scroll DENTRO deste ficheiro
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};


function AppRoutes() {
  return (
    <> {/* 3. Envolver tudo num fragmento <>...</> */}
      <ScrollToTop /> {/* 4. Adicionar o componente de scroll aqui */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/como-separar/como-fazer" element={<GenericPage slug="como-fazer-separacao" />} />
        <Route path="/como-separar/residuos" element={<GenericPage slug="quais-residuos" />} />
        <Route path="/como-separar/porque-separar" element={<GenericPage slug="porque-separar" />} />
        <Route path="/quemsomos" element={<GenericPage slug="quem-somos" />} />
        <Route path="/total-coletado" element={<GenericPage slug="total-coletado-grafico" />} />
        <Route path="/contato" element={<GenericPage slug="contato" />} />
        <Route path="/faq" element={<GenericPage slug="faq" />} />
        
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/paginas/edit/:id" element={<PrivateRoute><EditPage /></PrivateRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
