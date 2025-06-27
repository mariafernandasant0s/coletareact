// src/routes/AppRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Importando páginas públicas
import HomePage from '../pages/public/Home';
import GenericPage from '../pages/public/GenericPage';
import NotFoundPage from '../pages/public/NotFoundPage';

// Importando páginas de admin
// ✅✅✅ ESTA É A CORREÇÃO PRINCIPAL ✅✅✅
// Estamos importando o componente de login da forma correta.
import LoginPage from '../pages/admin/LoginPage'; 
import AdminDashboard from '../pages/admin/AdminDashboard';
import EditPage from '../pages/admin/EditPage';

function AppRoutes() {
  return (
    <Routes>
      {/* --- Rotas Públicas --- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/como-separar/como-fazer" element={<GenericPage slug="como-fazer-separacao" />} />
      <Route path="/como-separar/residuos" element={<GenericPage slug="quais-residuos" />} />
      <Route path="/como-separar/porque-separar" element={<GenericPage slug="porque-separar" />} />
      <Route path="/quemsomos" element={<GenericPage slug="quem-somos" />} />
      <Route path="/total-coletado" element={<GenericPage slug="total-coletado-grafico" />} />
      <Route path="/contato" element={<GenericPage slug="contato" />} />
      
      {/* --- Rotas de Admin --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<LoginPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      
      {/* --- Rotas Privadas de Admin --- */}
      <Route 
        path="/admin/dashboard" 
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/admin/paginas/edit/:id" 
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        } 
      />

      {/* --- Rota de Erro 404 (sempre por último) --- */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
