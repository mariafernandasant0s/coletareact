// src/routes/AppRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componente de texto simples para usar como placeholder
const PaginaSegura = ({ nome }) => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2>Página "{nome}" carregada em Modo de Segurança.</h2>
    <p>A estrutura do site está funcionando.</p>
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Todas as rotas agora mostram um componente seguro */}
      <Route path="/" element={<PaginaSegura nome="Início" />} />
      <Route path="/como-separar/como-fazer" element={<PaginaSegura nome="Como Fazer" />} />
      <Route path="/como-separar/residuos" element={<PaginaSegura nome="Resíduos" />} />
      <Route path="/como-separar/porque-separar" element={<PaginaSegura nome="Porque Separar" />} />
      <Route path="/quemsomos" element={<PaginaSegura nome="Quem Somos" />} />
      <Route path="/total-coletado" element={<PaginaSegura nome="Total Coletado" />} />
      <Route path="/contato" element={<PaginaSegura nome="Contato" />} />
      
      {/* As rotas de admin também são seguras por enquanto */}
      <Route path="/admin/login" element={<PaginaSegura nome="Admin Login" />} />
      <Route path="/admin/dashboard" element={<PaginaSegura nome="Admin Dashboard" />} />
      <Route path="/admin/paginas/edit/:id" element={<PaginaSegura nome="Editar Página" />} />

      {/* Rota de Erro 404 */}
      <Route path="*" element={<PaginaSegura nome="Página Não Encontrada (404)" />} />
    </Routes>
  );
}

export default AppRoutes;
