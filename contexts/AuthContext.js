import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica e carrega o usuário ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('user_token');
        if (token) {
          // Verifica se o token ainda é válido
          const { data } = await api.get('/api/auth/me');
          setUser(data);
        }
      } catch (error) {
        console.error('Falha ao carregar usuário:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login com tratamento de erros
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const { data } = await api.post('/api/auth/login', { email, password });
      
      if (!data.token) {
        throw new Error('Token não recebido');
      }

      localStorage.setItem('user_token', data.token);
      
      // Armazena apenas informações não sensíveis
      const userInfo = { 
        nome: data.nome, 
        email: data.email,
        id: data.id,
        role: data.role // Se usar controle de acesso
      };
      
      setUser(userInfo);
      localStorage.setItem('user_info', JSON.stringify(userInfo));
      
      return { success: true, user: userInfo };
    } catch (error) {
      console.error('Erro no login:', error);
      logout();
      return { 
        success: false, 
        error: error.response?.data?.message || 'Falha no login' 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout seguro
  const logout = useCallback(() => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_info');
    setUser(null);
    navigate('/admin/login'); // Redireciona para login
  }, [navigate]);

  // Verifica permissões (opcional)
  const hasPermission = useCallback((requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole; // Adapte para seu sistema de roles
  }, [user]);

  const authValue = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
