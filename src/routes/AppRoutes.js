// src/routes/AppRoutes.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import HomePage from '../pages/public/HomePage'; // ✅ NOTE A MUDANÇA NO NOME DO ARQUIVO AQUI
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

export default AppRoutes;```

---

#### **Arquivo 3: `src/pages/public/HomePage.js` (A Página Inicial Segura)**

Este é o arquivo que estava quebrando tudo. Vamos substituí-lo por uma versão que não faz chamadas à API, garantindo que o site não quebre.

```javascript
// src/pages/public/HomePage.js

import React from 'react';
import { Helmet } from 'react-helmet-async';

// Versão "Modo de Segurança" que não pode quebrar
function HomePage() {
  return (
    <>
      <Helmet>
        <title>Início - Coleta Seletiva</title>
      </Helmet>
      <section className="info-section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Site Recuperado com Sucesso!</h2>
          <p>A estrutura principal está funcionando.</p>
          <p>Próximo passo: restaurar o conteúdo dinâmico desta página.</p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
