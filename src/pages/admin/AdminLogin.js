// src/pages/admin/AdminLogin.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../contexts/AuthContext'; // Importe o contexto
import './Admin.css';

function LoginPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext); // Use o contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Usa a função de login do contexto
      await auth.login(email, password);
      navigate('/admin/dashboard'); // Redireciona em caso de sucesso
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao tentar fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-background">
      <Helmet>
        <title>Login - Painel Administrativo</title>
      </Helmet>
      <div className="login-container">
        <h2>Acesso ao Painel</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AdminLogin;
