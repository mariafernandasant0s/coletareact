import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import './Admin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await auth.login(email, password);
      // Navega no próprio AuthContext, então aqui só segue normal
    } catch (err) {
      // Se erro da API vier com mensagem, mostre ela; se não, mensagem genérica
      if (err.response?.status === 401) {
        setError('❌ Email ou senha incorretos. Por favor, verifique e tente novamente.');
      } else if (err.response?.status === 400) {
        setError('❌ Por favor, preencha todos os campos corretamente.');
      } else {
        setError('❌ Erro inesperado ao tentar fazer login. Tente novamente mais tarde.');
      }
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

          {/* Mensagem de erro vermelha explicativa */}
          {error && (
            <div
              style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                padding: '10px 15px',
                borderRadius: 4,
                marginBottom: 15,
                fontWeight: 'bold',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }}
              role="alert"
            >
              {error}
            </div>
          )}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
