// src/routes/AppRoutes.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// ✅ CORREÇÃO APLICADA AQUI: Apontando para o arquivo correto 'Home.js'
import HomePage from '../pages/public/Home'; 
import GenericPage from '../pages/public/GenericPage';
import NotFoundPage from '../pages/public/NotFoundPage';

import AdminLogin from '../pages/admin/AdminLogin';
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
      <Route path="/login" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/dashboard" element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      } />
      <Route path="/admin/paginas/edit/:id" element={
        <PrivateRoute>
          <EditPage />
        </PrivateRoute>
      } />

      {/* --- Rota de Erro 404 --- */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
