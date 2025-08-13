import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_info");
    setUser(null);
    navigate("/admin/login");
  }, [navigate]);

  // Adiciona automaticamente o token em todas as requisições
  useEffect(() => {
    api.interceptors.request.use((config) => {
      const token = localStorage.getItem('user_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, []);

  // Carrega usuário no início
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user_info');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // já mostra info local
        }

        const token = localStorage.getItem('user_token');
        if (token) {
          const { data } = await api.get('/api/auth/me');
          setUser(data);
          localStorage.setItem('user_info', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Falha ao carregar usuário:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout]); // Adicionado logout como dependência

  // Login
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/login", { email, password });

      if (!data.token) {
        throw new Error("Token não recebido");
      }

      localStorage.setItem("user_token", data.token);

      const userInfo = {
        nome: data.nome,
        email: data.email,
        id: data.id,
        role: data.role
      };

      setUser(userInfo);
      localStorage.setItem("user_info", JSON.stringify(userInfo));

      return { success: true, user: userInfo };
    } catch (error) {
      console.error("Erro no login:", error);
      logout();
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Falha no login"
      };
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Permissão
  const hasPermission = useCallback((requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
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
      {loading ? <div>Carregando...</div> : children}
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

